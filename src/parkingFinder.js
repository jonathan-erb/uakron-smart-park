/**
 * Parking finder logic using ArcGIS geometryEngine
 * Finds nearest available parking to a destination
 * 
 * REFERENCES:
 * - geometryEngine.distance(): https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#distance
 * - Point geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Point.html
 * - Polyline geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Polyline.html
 * - Graphic class: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
 * - Symbols guide: https://developers.arcgis.com/javascript/latest/visualization-symbols/
 * - Route Service: https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-route.html
 */

import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import * as route from "@arcgis/core/rest/route.js";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters.js";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet.js";
import Point from "@arcgis/core/geometry/Point.js";
import Graphic from "@arcgis/core/Graphic.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import esriConfig from "@arcgis/core/config.js";

/**
 * Find the nearest available parking lot to a destination point
 * @param {Point} destinationPoint - ArcGIS Point geometry
 * @param {Object} parkingGeoJSON - GeoJSON FeatureCollection of parking lots
 * @returns {Object|null} - Nearest parking lot feature with distance
 */
export function findNearestParking(destinationPoint, parkingGeoJSON) {
  const availableLots = parkingGeoJSON.features.filter(
    (lot) => lot.properties.availableSpaces > 0
  );

  if (availableLots.length === 0) {
    console.warn("No available parking lots found.");
    return null;
  }

  let nearestLot = null;
  let minDistance = Infinity;

  availableLots.forEach((lot) => {
    const [lon, lat] = lot.geometry.coordinates;
    const lotPoint = new Point({
      longitude: lon,
      latitude: lat,
      spatialReference: destinationPoint.spatialReference
    });

    // Calculate planar distance (good for campus-scale)
    const distance = geometryEngine.distance(
      destinationPoint,
      lotPoint,
      "meters"
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestLot = lot;
    }
  });

  return {
    lot: nearestLot,
    distance: minDistance,
    distanceInFeet: Math.round(minDistance * 3.28084) // Convert to feet
  };
}

/**
 * Create a graphic to highlight the selected destination
 * @param {Point} point - ArcGIS Point
 * @param {string} label - Label text
 * @returns {Graphic}
 */
export function createDestinationGraphic(point, label) {
  return new Graphic({
    geometry: point,
    symbol: new SimpleMarkerSymbol({
      style: "diamond",
      color: [255, 0, 0, 0.8],
      size: "16px",
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    }),
    attributes: {
      name: label,
      type: "destination"
    },
    popupTemplate: {
      title: "Destination",
      content: `<p><strong>${label}</strong></p>`
    }
  });
}

/**
 * Create a graphic to highlight the recommended parking lot
 * @param {Object} parkingFeature - GeoJSON feature
 * @param {number} distance - Distance in meters
 * @returns {Graphic}
 */
export function createParkingGraphic(parkingFeature, distance) {
  const [lon, lat] = parkingFeature.geometry.coordinates;
  const point = new Point({
    longitude: lon,
    latitude: lat
  });

  const distanceFeet = Math.round(distance * 3.28084);

  return new Graphic({
    geometry: point,
    symbol: new SimpleMarkerSymbol({
      style: "circle",
      color: [0, 255, 0, 0.9],
      size: "18px",
      outline: {
        color: [255, 255, 255],
        width: 3
      }
    }),
    attributes: {
      ...parkingFeature.properties,
      distance: distanceFeet,
      type: "recommended-parking"
    },
    popupTemplate: {
      title: "Recommended: {name}",
      content: `
        <div style="font-size: 14px;">
          <p><strong>Distance:</strong> {distance} feet</p>
          <p><strong>Available:</strong> {availableSpaces} / {totalSpaces} spaces</p>
          <p><strong>Rate:</strong> $\{hourlyRate}/hour</p>
        </div>
      `
    }
  });
}

/**
 * Create a simple straight-line route graphic between two points
 * @param {Point} startPoint - Starting point
 * @param {Point} endPoint - Ending point
 * @returns {Graphic}
 */
export function createRouteGraphic(startPoint, endPoint) {
  const paths = [
    [
      [startPoint.longitude, startPoint.latitude],
      [endPoint.longitude, endPoint.latitude]
    ]
  ];

  const polyline = new Polyline({
    paths,
    spatialReference: startPoint.spatialReference
  });

  return new Graphic({
    geometry: polyline,
    symbol: new SimpleLineSymbol({
      color: [0, 150, 255, 0.8],
      width: 3,
      style: "dash"
    }),
    attributes: {
      type: "route"
    }
  });
}

/**
 * Calculate walking time estimate (assuming 3 mph walking speed)
 * @param {number} distanceMeters - Distance in meters
 * @returns {number} - Time in minutes
 */
export function calculateWalkingTime(distanceMeters) {
  const walkingSpeedMph = 3;
  const distanceMiles = distanceMeters / 1609.34;
  const timeHours = distanceMiles / walkingSpeedMph;
  return Math.round(timeHours * 60);
}

/**
 * Get top N nearest parking lots (for showing alternatives)
 * @param {Point} destinationPoint - ArcGIS Point
 * @param {Object} parkingGeoJSON - GeoJSON FeatureCollection
 * @param {number} topN - Number of results to return
 * @returns {Array} - Array of {lot, distance} objects
 */
export function getTopNearestParkingLots(destinationPoint, parkingGeoJSON, topN = 3) {
  const availableLots = parkingGeoJSON.features.filter(
    (lot) => lot.properties.availableSpaces > 0
  );

  const lotsWithDistance = availableLots.map((lot) => {
    const [lon, lat] = lot.geometry.coordinates;
    const lotPoint = new Point({
      longitude: lon,
      latitude: lat,
      spatialReference: destinationPoint.spatialReference
    });

    const distance = geometryEngine.distance(
      destinationPoint,
      lotPoint,
      "meters"
    );

    return {
      lot,
      distance,
      distanceInFeet: Math.round(distance * 3.28084),
      walkingTime: calculateWalkingTime(distance)
    };
  });

  // Sort by distance and return top N
  return lotsWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, topN);
}

/**
 * Get walking directions using ArcGIS Route Service
 * @param {Point} parkingPoint - Starting point (parking lot)
 * @param {Point} destinationPoint - End point (destination)
 * @returns {Promise<Object>} - Route result with directions and geometry
 */
export async function getWalkingDirections(parkingPoint, destinationPoint) {
  const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";
  
  // Ensure points have proper spatial reference
  const stop1 = new Point({
    longitude: parkingPoint.longitude,
    latitude: parkingPoint.latitude,
    spatialReference: { wkid: 4326 }
  });
  
  const stop2 = new Point({
    longitude: destinationPoint.longitude,
    latitude: destinationPoint.latitude,
    spatialReference: { wkid: 4326 }
  });
  
  const routeParams = new RouteParameters({
    stops: new FeatureSet({
      features: [
        new Graphic({ geometry: stop1 }),
        new Graphic({ geometry: stop2 })
      ]
    }),
    returnDirections: true,
    directionsLanguage: "en",
    directionsLengthUnits: "feet",
    outSpatialReference: { wkid: 4326 }
  });

  try {
    const result = await route.solve(routeUrl, routeParams, {
      apiKey: esriConfig.apiKey
    });
    
    if (result.routeResults.length > 0) {
      const routeResult = result.routeResults[0];
      
      return {
        route: routeResult.route,
        directions: routeResult.directions,
        totalDistance: routeResult.directions.totalLength, // in feet
        totalTime: routeResult.directions.totalTime, // in minutes
        features: routeResult.directions.features // turn-by-turn steps
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error calculating route:", error);
    console.error("Error details:", error.details);
    return null;
  }
}

/**
 * Create a route graphic from route result
 * @param {Object} routeGeometry - Route polyline geometry
 * @returns {Graphic}
 */
export function createRouteGraphicFromService(routeGeometry) {
  return new Graphic({
    geometry: routeGeometry,
    symbol: new SimpleLineSymbol({
      color: [0, 150, 255, 0.8],
      width: 4,
      style: "solid"
    }),
    attributes: {
      type: "walking-route"
    }
  });
}
