import esriConfig from "@arcgis/core/config.js";

esriConfig.apiKey = import.meta.env.VITE_API_KEY;
if (!esriConfig.apiKey) {
  console.error("Missing VITE_API_KEY.");
}

import "./style.css";

import { defineCustomElements as defineMapElements } from "@arcgis/map-components/dist/loader";
import { defineCustomElements as defineCalciteElements } from "@esri/calcite-components/dist/loader";

defineMapElements(window, {
  resourcesUrl: "https://js.arcgis.com/map-components/4.34/assets"
});

defineCalciteElements(window, {
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.13.2/assets"
});

customElements.whenDefined("arcgis-map").then(() => {
  console.log("ArcGIS Map components loaded");
  initializeApp();
});

import { buildings } from "./src/parkingData.js";
import { initializeUI, updateParkingData } from "./src/ui.js";
import { ParkingSimulator } from "./src/simulationEngine.js";
import { initializeSimulatorControls } from "./src/simulatorControls.js";

let currentSimulator = null;

async function initializeApp() {
  const arcgisMapElement = document.querySelector("arcgis-map");

  if (!arcgisMapElement) {
    console.error("arcgis-map element not found");
    return;
  }

  const WEB_MAP_ID = "d94eeaa1d621403ea66fc558c956a863";

  arcgisMapElement.itemId = WEB_MAP_ID;

  arcgisMapElement.addEventListener("arcgisViewReadyChange", async (event) => {
    console.log("Map view is ready");

    const navigationLogo = document.querySelector("calcite-navigation-logo");
    if (navigationLogo) {
      navigationLogo.heading = "UAkron Smart Park";
      navigationLogo.description = "Find parking on campus";
    }

    console.log("🗺️ Loading web map from ArcGIS Online...");
    console.log("Map:", arcgisMapElement.map);
    console.log("View:", arcgisMapElement.view);

    // Find the parking layer in the web map
    const parkingLayer = arcgisMapElement.map.layers.find(
      layer => layer.title?.includes("parking") || layer.title?.includes("Parking")
    );

    if (!parkingLayer) {
      console.error("❌ Parking layer not found in web map");
      return;
    }

    console.log("✅ Found parking layer:", parkingLayer.title);

    // Wait for the layer to load
    await parkingLayer.load();

    // Query the data for proximity analysis
    console.log("📡 Fetching parking data...");
    const query = parkingLayer.createQuery();
    query.where = "1=1"; // Get all features
    query.outFields = ["*"];
    query.returnGeometry = true;

    const result = await parkingLayer.queryFeatures(query);
    
    // Convert to GeoJSON-like format for compatibility with existing code
    const parkingData = {
      type: "FeatureCollection",
      features: result.features.map(feature => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [feature.geometry.longitude, feature.geometry.latitude]
        },
        properties: feature.attributes
      }))
    };

    console.log(`✅ Loaded ${parkingData.features.length} parking lots`);

    // Initialize UI with the queried data
    initializeUI(arcgisMapElement, parkingData, buildings);

    // Initialize the time-based parking simulator
    console.log("🔄 Initializing parking simulator with time-based occupancy...");
    currentSimulator = new ParkingSimulator(parkingData, {
      updateIntervalMs: 10000, // 10 seconds for responsive updates
      demoMode: false,
      noiseStdDev: 0.04,
      transitionSurgeEnabled: true,
      transitionSurgeDuration: 10,
      useScheduleData: true,
    });

    // When simulator updates, push new data to the UI
    currentSimulator.onUpdate((updatedGeoJSON) => {
      console.log("📊 Parking occupancy updated via simulator");
      updateParkingData(updatedGeoJSON);
    });

    // Trigger immediate initial update so values aren't just hard-coded
    currentSimulator.updateNow();

    // Start the simulation
    currentSimulator.start();
    console.log("✅ Parking simulator started");

    // Initialize simulator controls and log helpful demo commands
    initializeSimulatorControls();

    // Expose simulator to window for debugging/demo controls
    window.parkingSimulator = currentSimulator;
  });
}
