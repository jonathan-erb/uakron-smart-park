import esriConfig from "@arcgis/core/config.js";

esriConfig.apiKey = import.meta.env.VITE_API_KEY;
if (!esriConfig.apiKey) {
  console.error(
    "Missing VITE_API_KEY."
  );
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

import { parkingLots, buildings } from "./src/parkingData.js";
import { createParkingLayer, createBuildingsLayer, addLayersToMap } from "./src/layers.js";
import { initializeUI } from "./src/ui.js";
import { ParkingSimulator } from "./src/simulationEngine.js";
import { initializeSimulatorControls } from "./src/simulatorControls.js";

let currentSimulator = null;
let currentParkingLayer = null;

function initializeApp() {
  const arcgisMapElement = document.querySelector("arcgis-map");

  if (!arcgisMapElement) {
    console.error("arcgis-map element not found");
    return;
  }

  arcgisMapElement.addEventListener("arcgisViewReadyChange", (event) => {
    console.log("Map view is ready");

    const navigationLogo = document.querySelector("calcite-navigation-logo");
    if (navigationLogo) {
      navigationLogo.heading = "UAkron Smart Park";
      navigationLogo.description = "Find parking on campus";
    }

    console.log("Map:", arcgisMapElement.map);
    console.log("View:", arcgisMapElement.view);
    console.log("");

    console.log("🎯 Loading full parking finder...");

    currentParkingLayer = createParkingLayer(parkingLots);
    // const buildingsLayer = createBuildingsLayer(buildings);
    addLayersToMap(arcgisMapElement, [currentParkingLayer]);

    initializeUI(arcgisMapElement, parkingLots, buildings);

    // Initialize parking simulator
    console.log("🔄 Initializing parking simulator with time-based occupancy...");
    currentSimulator = new ParkingSimulator(parkingLots, {
      updateIntervalMs: 10000, // 1 minute for responsive feedback during dev/testing
      demoMode: false,
      noiseStdDev: 0.04,
      transitionSurgeEnabled: true,
      transitionSurgeDuration: 10,
      useScheduleData: true,
    });

    // When simulator updates, refresh the layer on the map
    currentSimulator.onUpdate((updatedGeoJSON) => {
      console.log("📊 Parking occupancy updated");
      console.log("Sample lot - Lot 24:", {
        availableSpaces: updatedGeoJSON.features.find(f => f.properties.id === "lot-24")?.properties.availableSpaces,
        occupancyRate: updatedGeoJSON.features.find(f => f.properties.id === "lot-24")?.properties.occupancyRate,
      });

      // Remove old layer and add new one
      if (currentParkingLayer && arcgisMapElement.map) {
        arcgisMapElement.map.remove(currentParkingLayer);
      }

      currentParkingLayer = createParkingLayer(updatedGeoJSON);
      addLayersToMap(arcgisMapElement, [currentParkingLayer]);
    });

    // Trigger immediate initial update so values aren't static
    currentSimulator.updateNow();

    // Start the simulation
    currentSimulator.start();
    console.log("✅ Parking simulator started (updates every 1 minute)");

    // Initialize simulator controls and log helpful demo commands
    initializeSimulatorControls();

    // Expose simulator to window for debugging/demo controls
    window.parkingSimulator = currentSimulator;

  });
}
