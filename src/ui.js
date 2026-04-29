/**
 * UI interactions for the Smart Parking Finder
 * Handles map clicks, building selection, and results display
 * 
 * REFERENCES:
 * - MapView events: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#events
 * - Click event: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event-click
 * - hitTest(): https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#hitTest
 * - GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
 * - goTo(): https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#goTo
 * - Calcite Components: https://developers.arcgis.com/calcite-design-system/components/
 */

import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import {
  findNearestParking,
  getTopNearestParkingLots,
  createDestinationGraphic,
  createParkingGraphic,
  createRouteGraphic,
  createRouteGraphicFromService,
  calculateWalkingTime,
  getWalkingDirections
} from "./parkingFinder.js";

let highlightLayer = null;
let currentDestination = null;
let arcgisMapElementRef = null;
let parkingDataRef = null;

/**
 * Initialize UI interactions
 * @param {HTMLElement} arcgisMapElement - The <arcgis-map> web component
 * @param {Object} parkingData - GeoJSON parking lots data
 * @param {Object} buildingsData - GeoJSON buildings data
 */
export function initializeUI(arcgisMapElement, parkingData, buildingsData) {
  arcgisMapElementRef = arcgisMapElement;
  parkingDataRef = parkingData;

  // Create a graphics layer for highlights and routes
  highlightLayer = new GraphicsLayer({
    title: "Highlights & Routes",
    listMode: "hide" // Don't show in layer list
  });

  arcgisMapElement.map.add(highlightLayer);

  // Listen for view click events
  setupMapClickHandler(arcgisMapElement, parkingData, buildingsData);

  // Listen for popup actions
  setupPopupActionHandlers(arcgisMapElement, parkingData);

  // Setup building selector dropdown if exists
  setupBuildingSelector(arcgisMapElement, parkingData, buildingsData);
}

/**
 * Update parking data and refresh the current recommendation if needed
 * @param {Object} newParkingData - GeoJSON FeatureCollection
 */
export function updateParkingData(newParkingData) {
  if (!parkingDataRef) return;

  parkingDataRef.features = newParkingData.features;

  if (currentDestination && arcgisMapElementRef) {
    findParkingForDestination(
      currentDestination.point,
      currentDestination.name,
      arcgisMapElementRef,
      parkingDataRef
    );
  }
}

/**
 * Handle map click events to select a destination
 * @param {HTMLElement} arcgisMapElement
 * @param {Object} parkingData
 * @param {Object} buildingsData
 */
function setupMapClickHandler(arcgisMapElement, parkingData, buildingsData) {
  arcgisMapElement.addEventListener("arcgisViewClick", (event) => {
    const { mapPoint } = event.detail;

    // Check if user clicked on a building or just the map
    arcgisMapElement.view.hitTest(event.detail).then((response) => {
      const buildingHit = response.results.find(
        (result) =>
          result.graphic && result.graphic.layer?.title === "Campus Buildings"
      );

      if (buildingHit) {
        // User clicked on a building
        const buildingName = buildingHit.graphic.attributes.name;
        findParkingForDestination(
          mapPoint,
          buildingName,
          arcgisMapElement,
          parkingData
        );
      } else {
        // User clicked on empty map area - allow custom destination
        findParkingForDestination(
          mapPoint,
          "Custom Location",
          arcgisMapElement,
          parkingData
        );
      }
    });
  });
}

/**
 * Handle popup action clicks (e.g., "Find Parking Here")
 * @param {HTMLElement} arcgisMapElement
 * @param {Object} parkingData
 */
function setupPopupActionHandlers(arcgisMapElement, parkingData) {
  const view = arcgisMapElement.view;
  if (!view || !view.popup) {
    console.warn("Popup is not available on the view yet.");
    return;
  }

  // Check if popup supports event handling (some web components may not)
  if (typeof view.popup.on !== "function") {
    console.warn("Popup event handlers not supported in this environment");
    return;
  }

  view.popup.on("trigger-action", (event) => {
    const selectedFeature = view.popup.selectedFeature;
    if (!selectedFeature) return;

    const actionId = event.action.id;
    const geometry = selectedFeature.geometry;
    const attributes = selectedFeature.attributes;

    const featurePoint = new Point({
      longitude: geometry.longitude ?? geometry.x,
      latitude: geometry.latitude ?? geometry.y,
      spatialReference: geometry.spatialReference || { wkid: 4326 }
    });

    if (actionId === "find-parking") {
      findParkingForDestination(
        featurePoint,
        attributes.name || "Selected Destination",
        arcgisMapElement,
        parkingData
      );
    }

    if (actionId === "select-parking") {
      if (!currentDestination) {
        showNoResultsMessage(
          "Select a destination first by clicking on a building or the map."
        );
        return;
      }

      const parkingFeature = {
        geometry: {
          coordinates: [featurePoint.longitude, featurePoint.latitude]
        },
        properties: attributes
      };

      const distance = geometryEngine.distance(
        currentDestination.point,
        featurePoint,
        "meters"
      );

      highlightLayer.removeAll();
      highlightLayer.addMany([
        createParkingGraphic(parkingFeature, distance),
        createRouteGraphic(featurePoint, currentDestination.point)
      ]);

      displayResults(
        {
          lot: parkingFeature,
          distance,
          distanceInFeet: Math.round(distance * 3.28084)
        },
        arcgisMapElement
      );
    }
  });
}

/**
 * Setup building selector dropdown
 * @param {HTMLElement} arcgisMapElement
 * @param {Object} parkingData
 * @param {Object} buildingsData
 */
function setupBuildingSelector(arcgisMapElement, parkingData, buildingsData) {
  const selector = document.getElementById("building-select");
  if (!selector) return;

  // Populate dropdown with buildings
  buildingsData.features.forEach((building) => {
    const option = document.createElement("calcite-option");
    option.value = building.properties.id;
    option.textContent = building.properties.name;
    selector.appendChild(option);
  });

  // Handle selection
  selector.addEventListener("calciteSelectChange", () => {
    const selectedId = selector.value;
    const building = buildingsData.features.find(
      (b) => b.properties.id === selectedId
    );

    if (building) {
      const [lon, lat] = building.geometry.coordinates;
      const mapPoint = new Point({ longitude: lon, latitude: lat });

      findParkingForDestination(
        mapPoint,
        building.properties.name,
        arcgisMapElement,
        parkingData
      );

      // Zoom to the building
      arcgisMapElement.view.goTo({
        center: mapPoint,
        zoom: 17
      });
    }
  });
}

/**
 * Find parking for a destination and display results
 * @param {Point} destinationPoint - ArcGIS Point
 * @param {string} destinationName - Name of destination
 * @param {HTMLElement} arcgisMapElement
 * @param {Object} parkingData
 */
function findParkingForDestination(
  destinationPoint,
  destinationName,
  arcgisMapElement,
  parkingData
) {
  // Clear previous highlights
  highlightLayer.removeAll();

  // Store current destination
  currentDestination = {
    point: destinationPoint,
    name: destinationName
  };

  // Find top nearest parking lots
  const results = getTopNearestParkingLots(destinationPoint, parkingData, 3);

  if (!results || results.length === 0) {
    showNoResultsMessage();
    return;
  }

  // Use the best result for initial display
  const bestResult = results[0];

  // Create graphics for best result
  const destGraphic = createDestinationGraphic(destinationPoint, destinationName);
  const parkingGraphic = createParkingGraphic(bestResult.lot, bestResult.distance);

  // Create parking lot point
  const [lon, lat] = bestResult.lot.geometry.coordinates;
  const parkingPoint = new Point({ longitude: lon, latitude: lat });

  // Use straight line for campus navigation (more accurate than road routing)
  const routeGraphic = createRouteGraphic(parkingPoint, destinationPoint);

  // Add to map
  highlightLayer.addMany([routeGraphic, destGraphic, parkingGraphic]);

  // Display results in info panel (show all results with filtering)
  displayResults(results, arcgisMapElement, destinationName);

  // Zoom to show both points
  arcgisMapElement.view.goTo({
    target: [destGraphic, parkingGraphic],
    zoom: 17
  });
}

/**
 * Display parking results in the info panel
 * @param {Object} result - Result from findNearestParking
 * @param {HTMLElement} arcgisMapElement
 */
function displayResults(results, arcgisMapElement, destinationName = "Selected Location") {
  const panel = document.getElementById("info-panel");
  if (!panel) {
    console.log("Parking results:", results);
    return;
  }

  // Handle single result (backward compatibility)
  if (!Array.isArray(results)) {
    results = [results];
  }

  // Get unique permit types for filtering
  const allPermitTypes = [...new Set(results.flatMap(r => r.lot.properties.permitType.split('/')))].sort();

  // Build permit type options
  const permitOptions = allPermitTypes.map(type => `<calcite-option value="${type}">${type}</calcite-option>`).join('');

  panel.innerHTML = `
    <calcite-panel heading="Parking Recommendations for ${destinationName}" closable collapsed="false">
      <div style="padding: 16px; padding-bottom: 0;">
        <calcite-notice open icon="parking" kind="info">
          <div slot="title">${results.length} Options Found</div>
          <div slot="message">
            Filter by permit type or select your preferred spot
          </div>
        </calcite-notice>
      </div>

      <div style="padding: 16px; padding-top: 0;">
        <calcite-label>
          Filter by Permit Type
          <calcite-select id="permit-filter" placeholder="All Types">
            <calcite-option value="">All Types</calcite-option>
            ${permitOptions}
          </calcite-select>
        </calcite-label>
      </div>

      <div id="parking-results" style="padding: 0 16px 16px 16px;">
        ${results.map((result, index) => {
          const walkingTime = calculateWalkingTime(result.distance);
          const distance = result.distanceInFeet || Math.round(result.distance * 3.28084);
          const isBest = index === 0;

          return `
            <div class="parking-result" data-permit-type="${result.lot.properties.permitType}" style="margin-bottom: 12px; padding: 12px; border: 2px solid ${isBest ? '#007ac2' : '#e0e0e0'}; border-radius: 4px; ${isBest ? 'background: #f0f8ff;' : ''}">
              ${isBest ? '<div style="margin-bottom: 8px;"><calcite-chip icon="star" kind="brand" scale="s">Best Option</calcite-chip></div>' : ''}
              
              <div style="margin-bottom: 8px;">
                <calcite-chip icon="parking" kind="neutral">
                  ${result.lot.properties.name}
                </calcite-chip>
                <calcite-chip icon="walking" kind="neutral" style="margin-left: 8px;">
                  ${distance} ft (~${walkingTime} min)
                </calcite-chip>
              </div>

              <div style="margin-bottom: 8px;">
                <p style="margin: 4px 0;"><strong>Available:</strong> ${result.lot.properties.availableSpaces} / ${result.lot.properties.totalSpaces}</p>
                <p style="margin: 4px 0;"><strong>Permit:</strong> ${result.lot.properties.permitType}</p>
                <p style="margin: 4px 0;"><strong>Rate:</strong> $${result.lot.properties.hourlyRate}/hour</p>
              </div>

              <div style="margin-bottom: 8px; padding: 8px; background: #f9f9f9; border-radius: 4px; font-size: 13px;">
                ${result.lot.properties.description}
              </div>

              <calcite-button width="full" data-lot-id="${result.lot.properties.id}" class="select-parking-btn">
                Select This Lot
              </calcite-button>
            </div>
          `;
        }).join('')}
      </div>
    </calcite-panel>
  `;

  panel.style.display = "block";
  
  // Ensure panel is expanded (not collapsed)
  const panelElement = panel.querySelector('calcite-panel');
  if (panelElement) {
    panelElement.collapsed = false;
    
    // Handle panel close event
    panelElement.addEventListener('calcitePanelClose', () => {
      panel.style.display = "none";
      clearResults();
    }, { once: true });
  }

  // Setup permit filtering
  const permitFilter = document.getElementById("permit-filter");
  const parkingResults = document.getElementById("parking-results");
  
  if (permitFilter && parkingResults) {
    permitFilter.addEventListener("calciteSelectChange", (event) => {
      const selectedPermit = event.target.value;
      const resultElements = parkingResults.querySelectorAll('.parking-result');
      
      resultElements.forEach(element => {
        const lotPermitTypes = element.dataset.permitType.split('/');
        if (!selectedPermit || lotPermitTypes.includes(selectedPermit)) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
    });
  }

  // Setup select parking buttons
  const selectButtons = panel.querySelectorAll('.select-parking-btn');
  selectButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const lotId = event.target.dataset.lotId;
      const selectedResult = results.find(r => r.lot.properties.id === lotId);
      
      if (selectedResult) {
        // Update map graphics for selected lot
        highlightLayer.removeAll();
        
        const [lon, lat] = selectedResult.lot.geometry.coordinates;
        const parkingPoint = new Point({ longitude: lon, latitude: lat });
        
        highlightLayer.addMany([
          createDestinationGraphic(currentDestination.point, currentDestination.name),
          createParkingGraphic(selectedResult.lot, selectedResult.distance),
          createRouteGraphic(parkingPoint, currentDestination.point)
        ]);

        // Show directions for selected lot
        showDirectionsPanel(selectedResult, arcgisMapElement);
      }
    });
  });
}

/**
 * Show directions panel for selected parking lot
 */
function showDirectionsPanel(result, arcgisMapElement) {
  const panel = document.getElementById("info-panel");
  if (!panel) return;

  const walkingTime = calculateWalkingTime(result.distance);
  const distance = result.distanceInFeet || Math.round(result.distance * 3.28084);

  panel.innerHTML = `
    <calcite-panel heading="Directions to ${result.lot.properties.name}" closable collapsed="false">
      <div style="padding: 16px;">
        <calcite-notice open icon="parking" kind="success">
          <div slot="title">Selected Parking Lot</div>
          <div slot="message">
            ${result.lot.properties.name} - ${distance} ft (~${walkingTime} min walk)
          </div>
        </calcite-notice>
        
        <div style="margin-top: 16px;">
          <p><strong>Available Spaces:</strong> ${result.lot.properties.availableSpaces} / ${result.lot.properties.totalSpaces}</p>
          <p><strong>Permit Type:</strong> ${result.lot.properties.permitType}</p>
          <p><strong>Rate:</strong> $${result.lot.properties.hourlyRate}/hour</p>
        </div>

        <div style="margin-top: 16px; padding: 12px; background: #f3f3f3; border-radius: 4px;">
          <p style="font-size: 13px; color: #666;">
            ${result.lot.properties.description}
          </p>
        </div>
      </div>

      <calcite-button slot="footer-start" width="half" id="back-to-results-btn">
        Back to Results
      </calcite-button>
      <calcite-button slot="footer-end" width="half" id="get-directions-btn" kind="brand">
        Get Walking Directions
      </calcite-button>
    </calcite-panel>
  `;

  // Handle back to results button
  const backBtn = document.getElementById("back-to-results-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // Re-show the results panel
      const allResults = getTopNearestParkingLots(currentDestination.point, parkingDataRef, 3);
      displayResults(allResults, arcgisMapElement, currentDestination.name);
    });
  }

  // Handle directions button
  const directionsBtn = document.getElementById("get-directions-btn");
  if (directionsBtn) {
    directionsBtn.addEventListener("click", async () => {
      directionsBtn.disabled = true;
      directionsBtn.textContent = "Calculating route...";

      const [lotLon, lotLat] = result.lot.geometry.coordinates;
      const parkingPoint = new Point({
        longitude: lotLon,
        latitude: lotLat,
        spatialReference: { wkid: 4326 }
      });

      const routeInfo = await getWalkingDirections(
        parkingPoint,
        currentDestination.point
      );

      directionsBtn.disabled = false;
      directionsBtn.textContent = "Get Walking Directions";

      if (routeInfo && routeInfo.route) {
        if (highlightLayer) {
          highlightLayer.removeAll();
          highlightLayer.addMany([
            createRouteGraphicFromService(routeInfo.route.geometry ?? routeInfo.route),
            createDestinationGraphic(currentDestination.point, currentDestination.name),
            createParkingGraphic(result.lot, result.distance)
          ]);
        }
        showTurnByTurnDirections(routeInfo, result.lot);
      } else {
        openDirections(result.lot, currentDestination);
      }
    });
  }
}

/**
 * Show message when no parking is available
 */
function showNoResultsMessage(message = "All parking lots are currently full. Please try again later.") {
  const panel = document.getElementById("info-panel");
  if (!panel) {
    console.warn(message);
    return;
  }

  panel.innerHTML = `
    <calcite-panel heading="Parking Search">
      <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
        <div slot="title">No Parking Available</div>
        <div slot="message">
          ${message}
        </div>
      </calcite-notice>
    </calcite-panel>
  `;

  panel.style.display = "block";
}

/**
 * Open directions in external mapping service
 * @param {Object} parkingLot - Parking lot feature
 * @param {Object} destination - Destination object
 */
function openDirections(parkingLot, destination) {
  const [parkLon, parkLat] = parkingLot.geometry.coordinates;
  const destLat = destination.point.latitude;
  const destLon = destination.point.longitude;

  // Open Google Maps with directions
  const url = `https://www.google.com/maps/dir/?api=1&origin=${parkLat},${parkLon}&destination=${destLat},${destLon}&travelmode=walking`;
  window.open(url, "_blank");
}

/**
 * Show turn-by-turn directions in the panel
 * @param {Object} routeInfo - Route information from routing service
 * @param {Object} parkingLot - Parking lot feature
 */
function showTurnByTurnDirections(routeInfo, parkingLot) {
  const panel = document.getElementById("info-panel");
  if (!panel) return;

  const directionsHTML = routeInfo.features.map((step, index) => {
    return `
      <div style="padding: 8px; border-bottom: 1px solid #eee;">
        <div style="display: flex; align-items: start; gap: 8px;">
          <calcite-icon icon="navigation" scale="s"></calcite-icon>
          <div>
            <strong>${index + 1}.</strong> ${step.attributes.text}
            <div style="font-size: 12px; color: #666; margin-top: 4px;">
              ${Math.round(step.attributes.length)} ft
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  panel.innerHTML = `
    <calcite-panel heading="Walking Directions" closable>
      <calcite-action slot="header-actions-end" icon="x" text="Close" id="close-directions"></calcite-action>
      
      <div style="padding: 16px; background: #f8f8f8; border-bottom: 2px solid #0079c1;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <calcite-icon icon="walking" scale="m"></calcite-icon>
            <strong>${Math.round(routeInfo.totalDistance)} ft</strong>
          </div>
          <div>
            <calcite-icon icon="clock" scale="m"></calcite-icon>
            <strong>${Math.round(routeInfo.totalTime)} min</strong>
          </div>
        </div>
      </div>

      <div style="max-height: 400px; overflow-y: auto;">
        ${directionsHTML}
      </div>

      <calcite-button slot="footer" width="full" id="back-to-summary-btn">
        Back to Summary
      </calcite-button>
    </calcite-panel>
  `;

  // Handle back button
  const backBtn = document.getElementById("back-to-summary-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const result = {
        lot: parkingLot,
        distance: routeInfo.totalDistance / 3.28084, // convert feet to meters
        distanceInFeet: Math.round(routeInfo.totalDistance)
      };
      displayResults(result, arcgisMapElementRef);
    });
  }

  // Handle close button
  const closeBtn = document.getElementById("close-directions");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      panel.style.display = "none";
    });
  }
}


/**
 * Clear all highlights and results
 */
export function clearResults() {
  if (highlightLayer) {
    highlightLayer.removeAll();
  }

  const panel = document.getElementById("info-panel");
  if (panel) {
    panel.style.display = "none";
  }

  currentDestination = null;
}

/**
 * Get current destination
 * @returns {Object|null}
 */
export function getCurrentDestination() {
  return currentDestination;
}
