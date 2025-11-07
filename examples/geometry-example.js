/**
 * EXAMPLE: Using geometryEngine to calculate distances
 * 
 * This example shows how to:
 * 1. Create two Point geometries
 * 2. Use geometryEngine.distance() to calculate distance
 * 3. Convert between units
 * 
 * To use: Import and call distanceCalculationExample() in main.js
 * 
 * REFERENCES:
 * - geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
 * - geometryEngine.distance(): https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#distance
 * - Point class: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Point.html
 * - Spatial analysis guide: https://developers.arcgis.com/javascript/latest/spatial-analysis/
 * - Tutorial: https://developers.arcgis.com/javascript/latest/query-spatial-data/
 */

import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point.js";

export function distanceCalculationExample() {
  // Create two points (e.g., a building and a parking lot)
  const building = new Point({
    longitude: -81.5105,
    latitude: 41.0745
  });
  
  const parkingLot = new Point({
    longitude: -81.5085,
    latitude: 41.0750
  });
  
  // Calculate distance in meters
  const distanceMeters = geometryEngine.distance(building, parkingLot, "meters");
  
  // Convert to feet
  const distanceFeet = distanceMeters * 3.28084;
  
  console.log("Distance Calculation Example:");
  console.log(`  ${distanceMeters.toFixed(2)} meters`);
  console.log(`  ${distanceFeet.toFixed(2)} feet`);
  console.log(`  ${(distanceFeet / 5280).toFixed(2)} miles`);
  
  return {
    meters: distanceMeters,
    feet: distanceFeet
  };
}

/**
 * Find the nearest point from an array of points
 */
export function findNearestExample(targetPoint, pointsArray) {
  let nearestPoint = null;
  let minDistance = Infinity;
  
  pointsArray.forEach(point => {
    const distance = geometryEngine.distance(targetPoint, point, "meters");
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = point;
    }
  });
  
  console.log("Nearest point found:");
  console.log("  Distance:", minDistance.toFixed(2), "meters");
  
  return {
    point: nearestPoint,
    distance: minDistance
  };
}
