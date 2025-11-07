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

import Point from "@arcgis/core/geometry/Point.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import {
  findNearestParking,
  getTopNearestParkingLots,
  createDestinationGraphic,
  createParkingGraphic,
  createRouteGraphic
} from "./parkingFinder.js";

let highlightLayer = null;
let currentDestination = null;

/**
 * Initialize UI interactions
 * @param {HTMLElement} arcgisMapElement - The <arcgis-map> web component
 * @param {Object} parkingData - GeoJSON parking lots data
 * @param {Object} buildingsData - GeoJSON buildings data
 */
export function initializeUI(arcgisMapElement, parkingData, buildingsData) {
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
  // NOTE: With web components, popup events need to be handled differently
  // Using watchUtils or direct event listeners on the popup element
  // For now, this is commented out - you can add functionality via map clicks instead
  
  // TODO: Implement popup action handling compatible with web components
  // See: https://developers.arcgis.com/javascript/latest/components/
  
  console.log("Popup action handlers - not yet implemented for web components");
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


  // @TODO need to fix the parking deck data and location point
  // Store current destination
  currentDestination = {
    point: destinationPoint,
    name: destinationName
  };

  // Find nearest parking
  const result = findNearestParking(destinationPoint, parkingData);

  if (!result) {
    showNoResultsMessage();
    return;
  }

  // Create graphics
  const destGraphic = createDestinationGraphic(destinationPoint, destinationName);
  const parkingGraphic = createParkingGraphic(result.lot, result.distance);

  // Create parking lot point
  const [lon, lat] = result.lot.geometry.coordinates;
  const parkingPoint = new Point({ longitude: lon, latitude: lat });

  const routeGraphic = createRouteGraphic(parkingPoint, destinationPoint);

  // Add to map
  highlightLayer.addMany([routeGraphic, destGraphic, parkingGraphic]);

  // Display results in info panel
  displayResults(result, arcgisMapElement);

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
function displayResults(result, arcgisMapElement) {
  const panel = document.getElementById("info-panel");
  if (!panel) {
    console.log("Nearest parking:", result.lot.properties.name);
    console.log("Distance:", result.distanceInFeet, "feet");
    return;
  }

  const walkingTime = Math.round((result.distance / 1609.34) * 20); // ~3mph = 20 min/mile

  panel.innerHTML = `
    <calcite-panel heading="Parking Recommendation" closable>
      <calcite-notice open icon="parking" kind="success">
        <div slot="title">Best Option Found</div>
        <div slot="message">
          ${result.lot.properties.name} - ${result.distanceInFeet} feet away
        </div>
      </calcite-notice>

      <div style="padding: 16px;">
        <calcite-label>
          <strong>${result.lot.properties.name}</strong>
        </calcite-label>
        
        <div style="margin-top: 12px;">
          <calcite-chip icon="walking" kind="neutral">
            ${result.distanceInFeet} ft (~${walkingTime} min walk)
          </calcite-chip>
        </div>

        <div style="margin-top: 12px;">
          <p><strong>Available Spaces:</strong> ${result.lot.properties.availableSpaces} / ${result.lot.properties.totalSpaces}</p>
          <p><strong>Permit Type:</strong> ${result.lot.properties.permitType}</p>
          <p><strong>Rate:</strong> $${result.lot.properties.hourlyRate}/hour</p>
        </div>

        <div style="margin-top: 12px; padding: 12px; background: #f3f3f3; border-radius: 4px;">
          <p style="font-size: 13px; color: #666;">
            ${result.lot.properties.description}
          </p>
        </div>
      </div>

      <calcite-button slot="footer" width="full" id="get-directions-btn">
        Get Directions
      </calcite-button>
    </calcite-panel>
  `;

  panel.style.display = "block";

  // Handle directions button
  const directionsBtn = document.getElementById("get-directions-btn");
  if (directionsBtn) {
    directionsBtn.addEventListener("click", () => {
      openDirections(result.lot, currentDestination);
    });
  }
}

/**
 * Show message when no parking is available
 */
function showNoResultsMessage() {
  const panel = document.getElementById("info-panel");
  if (!panel) {
    console.warn("No available parking found.");
    return;
  }

  panel.innerHTML = `
    <calcite-panel heading="Parking Search">
      <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
        <div slot="title">No Parking Available</div>
        <div slot="message">
          All parking lots are currently full. Please try again later.
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
