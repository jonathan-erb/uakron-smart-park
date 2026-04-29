// /**
//  * Layer management for parking lots using ArcGIS Online Feature Services
//  * 
//  * REFERENCES:
//  * - FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
//  * - Renderers: https://developers.arcgis.com/javascript/latest/visualization-renderers/
//  * - PopupTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
//  */

// import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
// import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
// import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
// import PopupTemplate from "@arcgis/core/PopupTemplate.js";

// /**
//  * Create a FeatureLayer for parking lots from ArcGIS Online Feature Service
//  * @param {string} serviceUrl - URL to your ArcGIS Online Feature Service
//  * @returns {FeatureLayer}
//  */
// export function createParkingLayerFromService(serviceUrl) {
//   // Color-coded renderer based on available spaces
//   const renderer = new ClassBreaksRenderer({
//     field: "availableSpaces",
//     legendOptions: {
//       title: "Available Spaces"
//     },
//     classBreakInfos: [
//       {
//         minValue: 0,
//         maxValue: 25,
//         symbol: new SimpleMarkerSymbol({
//           style: "circle",
//           color: [220, 50, 50, 0.9],
//           size: "14px",
//           outline: { color: [50, 50, 50], width: 2 }
//         }),
//         label: "Full"
//       },
//       {
//         minValue: 26,
//         maxValue: 75,
//         symbol: new SimpleMarkerSymbol({
//           style: "circle",
//           color: [255, 165, 0, 0.9],
//           size: "14px",
//           outline: { color: [50, 50, 50], width: 2 }
//         }),
//         label: "Limited"
//       },
//       {
//         minValue: 76,
//         maxValue: 500,
//         symbol: new SimpleMarkerSymbol({
//           style: "circle",
//           color: [50, 200, 50, 0.9],
//           size: "14px",
//           outline: { color: [50, 50, 50], width: 2 }
//         }),
//         label: "Available"
//       }
//     ]
//   });

//   // Popup template
//   const popupTemplate = new PopupTemplate({
//     title: "{name}",
//     content: `
//       <div style="font-size: 14px;">
//         <p><strong>Available:</strong> {availableSpaces} / {totalSpaces} spaces</p>
//         <p><strong>Permit:</strong> {permitType}</p>
//         <p><strong>Rate:</strong> $\{hourlyRate}/hour</p>
//         <p style="margin-top: 8px; color: #666;">{description}</p>
//       </div>
//     `,
//     actions: [
//       {
//         id: "select-parking",
//         title: "Select This Lot",
//         className: "esri-icon-map-pin"
//       }
//     ]
//   });

//   const layer = new FeatureLayer({
//     url: serviceUrl,
//     title: "Parking Lots",
//     renderer,
//     popupTemplate,
//     legendEnabled: true,
//     outFields: ["*"], // Fetch all attributes
//     refreshInterval: 1 // Auto-refresh every 1 minute for real-time updates
//   });

//   return layer;
// }

// /**
//  * Query the feature layer to get all parking data (for proximity analysis)
//  * @param {FeatureLayer} layer 
//  * @returns {Promise<Object>} - GeoJSON-like object for compatibility
//  */
// export async function queryParkingData(layer) {
//   await layer.load();
  
//   const query = layer.createQuery();
//   query.where = "1=1"; // Get all features
//   query.outFields = ["*"];
//   query.returnGeometry = true;
  
//   const result = await layer.queryFeatures(query);
  
//   // Convert to GeoJSON-like format for compatibility with existing code
//   const geojson = {
//     type: "FeatureCollection",
//     features: result.features.map(feature => ({
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [feature.geometry.longitude, feature.geometry.latitude]
//       },
//       properties: feature.attributes
//     }))
//   };
  
//   return geojson;
// }

// /**
//  * Add layers to the map view
//  * @param {HTMLElement} arcgisMapElement - The <arcgis-map> web component
//  * @param {FeatureLayer[]} layers - Array of layers to add
//  */
// export function addLayersToMap(arcgisMapElement, layers) {
//   if (!arcgisMapElement.map) {
//     console.error("Map not ready. Wait for arcgisViewReadyChange event.");
//     return;
//   }

//   layers.forEach((layer) => {
//     arcgisMapElement.map.add(layer);
//   });
// }

// /**
//  * Get a layer by title from the map
//  * @param {HTMLElement} arcgisMapElement - The <arcgis-map> web component
//  * @param {string} title - Layer title
//  * @returns {Layer|null}
//  */
// export function getLayerByTitle(arcgisMapElement, title) {
//   if (!arcgisMapElement.map) return null;
//   return arcgisMapElement.map.layers.find((layer) => layer.title === title);
// }
