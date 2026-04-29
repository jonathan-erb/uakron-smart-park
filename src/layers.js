/**
 * Layer management for parking lots and buildings
 * Uses modern ArcGIS Maps SDK for JavaScript (v4.34+)
 * 
 * REFERENCES:
 * - GeoJSONLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html
 * - Renderers: https://developers.arcgis.com/javascript/latest/visualization-renderers/
 * - UniqueValueRenderer: https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-UniqueValueRenderer.html
 * - SimpleRenderer: https://developers.arcgis.com/javascript/latest/api-reference/esri-renderers-SimpleRenderer.html
 * - PopupTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-PopupTemplate.html
 * - Visual variables: https://developers.arcgis.com/javascript/latest/visualization-visual-variables/
 */

import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import PopupTemplate from "@arcgis/core/PopupTemplate.js";

/**
 * Create a GeoJSONLayer for parking lots with custom renderer and popup
 * @param {Object} geojsonData - GeoJSON FeatureCollection
 * @returns {GeoJSONLayer}
 */
export function createParkingLayer(geojsonData) {
	// Convert GeoJSON to Blob for GeoJSONLayer
	const blob = new Blob([JSON.stringify(geojsonData)], {
		type: "application/json"
	});
	const url = URL.createObjectURL(blob);

	// Color-coded renderer based on available spaces
	const renderer = new ClassBreaksRenderer({
		field: "availableSpaces",
		legendOptions: {
			title: "Available Spaces"
		},
		classBreakInfos: [
			{
				minValue: 0,
				maxValue: 25,
				symbol: new SimpleMarkerSymbol({
					style: "circle",
					color: [220, 50, 50, 0.9],
					size: "14px",
					outline: { color: [50, 50, 50], width: 2 }
				}),
				label: "Full"
			},
			{
				minValue: 26,
				maxValue: 75,
				symbol: new SimpleMarkerSymbol({
					style: "circle",
					color: [255, 165, 0, 0.9],
					size: "14px",
					outline: { color: [50, 50, 50], width: 2 }
				}),
				label: "Limited"
			},
			{
				minValue: 76,
				maxValue: 500,
				symbol: new SimpleMarkerSymbol({
					style: "circle",
					color: [50, 200, 50, 0.9],
					size: "14px",
					outline: { color: [50, 50, 50], width: 2 }
				}),
				label: "Available"
			}
		]
	});

	// Popup template with simulation data
	const popupTemplate = new PopupTemplate({
		title: "{name}",
		content: `
			<div style="font-size: 14px;">
				<p><strong>Available:</strong> {availableSpaces} / {totalSpaces} spaces</p>
				<p><strong>Occupancy:</strong> <span style="font-weight: bold; color: #d9534f;">{occupancyRate}</span> ({status})</p>
				<p><strong>Trend:</strong> {trend}</p>
				<p><strong>Permit:</strong> {permitType}</p>
				<p><strong>Rate:</strong> $\{hourlyRate}/hour</p>
				<p style="margin-top: 8px; font-size: 12px; color: #999;">Updated: {lastUpdated}</p>
				<p style="margin-top: 8px; color: #666;">{description}</p>
			</div>
		`,
		actions: [
			{
				id: "select-parking",
				title: "Select This Lot",
				className: "esri-icon-map-pin"
			}
		]
	});

	const layer = new GeoJSONLayer({
		url,
		title: "Parking Lots",
		renderer,
		popupTemplate,
		legendEnabled: true,
		// Store the original data for queries
		customParameters: {
			geojsonData
		}
	});

	return layer;
}

/**
 * Create a GeoJSONLayer for campus buildings with custom renderer and popup
 * @param {Object} geojsonData - GeoJSON FeatureCollection
 * @returns {GeoJSONLayer}
 */
export function createBuildingsLayer(geojsonData) {
	const blob = new Blob([JSON.stringify(geojsonData)], {
		type: "application/json"
	});
	const url = URL.createObjectURL(blob);

	// Renderer: Blue markers for buildings
	const renderer = new SimpleRenderer({
		symbol: new SimpleMarkerSymbol({
			style: "square",
			color: [30, 144, 255, 0.8],
			size: "12px",
			outline: {
				color: [255, 255, 255],
				width: 2
			}
		})
	});

	// Popup template
	const popupTemplate = new PopupTemplate({
		title: "{name}",
		content: `
			<div style="font-size: 14px;">
				<p><strong>Category:</strong> {category}</p>
				<p style="margin-top: 8px; color: #666;">{description}</p>
			</div>
		`,
		actions: [
			{
				id: "find-parking",
				title: "Find Parking Here",
				className: "esri-icon-directions"
			}
		]
	});

	const layer = new GeoJSONLayer({
		url,
		title: "Campus Buildings",
		renderer,
		popupTemplate,
		customParameters: {
			geojsonData
		}
	});

	return layer;
}

/**
 * Add layers to the map view (via web component)
 * @param {HTMLElement} arcgisMapElement - The <arcgis-map> web component
 * @param {GeoJSONLayer[]} layers - Array of layers to add
 */
export function addLayersToMap(arcgisMapElement, layers) {
	// Access the map property from the web component
	if (!arcgisMapElement.map) {
		console.error("Map not ready. Wait for arcgisViewReadyChange event.");
		return;
	}

	layers.forEach((layer) => {
		arcgisMapElement.map.add(layer);
	});
}

/**
 * Get a layer by title from the map
 * @param {HTMLElement} arcgisMapElement - The <arcgis-map> web component
 * @param {string} title - Layer title
 * @returns {Layer|null}
 */
export function getLayerByTitle(arcgisMapElement, title) {
	if (!arcgisMapElement.map) return null;
	return arcgisMapElement.map.layers.find((layer) => layer.title === title);
}
