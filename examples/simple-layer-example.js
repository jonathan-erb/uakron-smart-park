/**
 * EXAMPLE: Adding a simple GeoJSON layer to the map
 * 
 * This example shows how to:
 * 1. Create a GeoJSON layer with sample data
 * 2. Add it to the map
 * 3. Style the features
 * 
 * To use: Import and call addParkingLotsExample(arcgisMapElement) in main.js
 * 
 * REFERENCES:
 * - GeoJSONLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html
 * - GeoJSON format: https://geojson.org/
 * - SimpleRenderer: https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html
 * - SimpleMarkerSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
 * - PopupTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
 * - Tutorial: https://developers.arcgis.com/javascript/latest/display-point-line-polygon-graphics/
 */

import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import { parkingLots } from "../src/parkingData.js";

export function addParkingLotsExample(arcgisMapElement) {
  // Use the real parking lot data from parkingData.js
  const parkingData = parkingLots;
  
  console.log("Loading parking lots:", parkingData.features.length, "lots found");

  // Convert to blob URL (required by GeoJSONLayer)
  const blob = new Blob([JSON.stringify(parkingData)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);

  // Create a simple renderer (green circles)
  const renderer = new SimpleRenderer({
    symbol: new SimpleMarkerSymbol({
      style: "circle",
      color: [50, 200, 50, 0.8],
      size: "16px",
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    })
  });

  // Create the layer
  const parkingLayer = new GeoJSONLayer({
    url,
    title: "Parking Lots",
    renderer,
    popupTemplate: {
      title: "{name}",
      content: `
        <div style="font-size: 14px;">
          <p><strong>Available:</strong> {availableSpaces} / {totalSpaces} spaces</p>
          <p><strong>Type:</strong> {type}</p>
          <p><strong>Permits:</strong> {permitTypes}</p>
          <p><strong>Rate:</strong> $\{hourlyRate}/hour</p>
        </div>
      `
    }
  });

  // Add to map
  arcgisMapElement.map.add(parkingLayer);
  
  console.log("Parking layer added! Click on a marker to see info.");
  
  return parkingLayer;
}
