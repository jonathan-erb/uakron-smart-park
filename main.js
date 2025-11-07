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
    
    const parkingLayer = createParkingLayer(parkingLots);
    // const buildingsLayer = createBuildingsLayer(buildings);
    addLayersToMap(arcgisMapElement, [parkingLayer]);
    
    initializeUI(arcgisMapElement, parkingLots, buildings);

  });
}
