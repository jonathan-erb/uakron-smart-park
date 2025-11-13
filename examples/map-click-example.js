/**
 * EXAMPLE: Listening for map clicks
 * 
 * This example shows how to:
 * 1. Listen for clicks on the map
 * 2. Get the clicked coordinates
 * 3. Display them in the console
 * 
 * To use: Import and call setupMapClickExample(arcgisMapElement) in main.js
 * 
 * REFERENCES:
 * - View events: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#events
 * - Click event: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#event-click
 * - Graphic class: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
 * - GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
 * - Tutorial: https://developers.arcgis.com/javascript/latest/tutorials/add-a-point-line-and-polygon/
 */

import Graphic from "@arcgis/core/Graphic.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";

export function setupMapClickExample(arcgisMapElement) {
  // Create a graphics layer to show clicked points
  const clickLayer = new GraphicsLayer({
    title: "Clicked Points"
  });
  
  arcgisMapElement.map.add(clickLayer);

  // Listen for map clicks
  arcgisMapElement.view.on("click", (event) => {
    const { mapPoint } = event;
    
    console.log("Map clicked at:");
    console.log("  Longitude:", mapPoint.longitude);
    console.log("  Latitude:", mapPoint.latitude);
    
    // Add a marker at the clicked location
    const graphic = new Graphic({
      geometry: mapPoint,
      symbol: new SimpleMarkerSymbol({
        style: "x",
        color: [255, 0, 0],
        size: "16px",
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      })
    });
    
    clickLayer.add(graphic);
    
    // Optional: Clear after 5 seconds
    setTimeout(() => {
      clickLayer.remove(graphic);
    }, 5000);
  });
  
  console.log("Map click listener added! Click anywhere on the map.");
}
