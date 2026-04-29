/**
 * Simulator Controls & Demo Utilities
 * 
 * Provides convenient methods to control the parking simulator:
 * - Demo mode (60x time acceleration for testing)
 * - Manual updates
 * - Status reporting
 * - Configuration tweaking
 * 
 * Access via: window.parkingSimulator (main simulator instance)
 * or use helper functions from this module
 */

/**
 * Initialize simulator controls and attach to window
 * Logs helpful demo commands to console
 */
export function initializeSimulatorControls() {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║           🅿️ PARKING SIMULATOR CONTROLS                        ║
╠════════════════════════════════════════════════════════════════╣
║  Available commands (in browser console):                       ║
║                                                                 ║
║  1. Enable Demo Mode (60x time acceleration):                  ║
║     window.parkingSimulator.setDemoMode(true)                 ║
║                                                                 ║
║  2. Disable Demo Mode (return to real-time):                  ║
║     window.parkingSimulator.setDemoMode(false)                ║
║                                                                 ║
║  3. Manual Occupancy Update:                                  ║
║     window.parkingSimulator.updateNow()                       ║
║                                                                 ║
║  4. View Current Occupancy Data:                              ║
║     let geojson = window.parkingSimulator.getGeoJSON()        ║
║     console.table(geojson.features.map(f => ({              ║
║       lot: f.properties.name,                                 ║
║       available: f.properties.availableSpaces,               ║
║       occupancy: f.properties.occupancyRate,                 ║
║       status: f.properties.status,                            ║
║       trend: f.properties.trend                              ║
║     })))                                                       ║
║                                                                 ║
║  5. Stop/Start Simulator:                                     ║
║     window.parkingSimulator.stop()                           ║
║     window.parkingSimulator.start()                          ║
║                                                                 ║
║  6. Change Update Interval (milliseconds):                    ║
║     window.parkingSimulator.config.updateIntervalMs = 60000  ║
║                                                                 ║
║  7. Toggle Noise:                                             ║
║     window.parkingSimulator.config.noiseStdDev = 0   // off   ║
║     window.parkingSimulator.config.noiseStdDev = 0.04 // on  ║
║                                                                 ║
╚════════════════════════════════════════════════════════════════╝
  `);
}

/**
 * Get a formatted summary of all parking lot occupancies
 */
export function getSummary(simulator) {
  if (!simulator) {
    console.error("Simulator not available");
    return;
  }

  const geojson = simulator.getGeoJSON();
  const summary = geojson.features.map((f) => ({
    Lot: f.properties.name,
    Available: f.properties.availableSpaces,
    Total: f.properties.totalSpaces,
    "Occupancy %": (
      (f.properties.occupancyRate * 100).toFixed(1)
    ),
    Status: f.properties.status,
    Trend: f.properties.trend,
  }));

  console.table(summary);
  return summary;
}

/**
 * Get stats on occupancy distribution
 */
export function getStats(simulator) {
  if (!simulator) {
    console.error("Simulator not available");
    return;
  }

  const geojson = simulator.getGeoJSON();
  const rates = geojson.features.map((f) => f.properties.occupancyRate);

  const stats = {
    "Total Lots": geojson.features.length,
    "Avg Occupancy": (
      (rates.reduce((a, b) => a + b, 0) / rates.length) *
      100
    ).toFixed(1) + "%",
    "Min Occupancy": (Math.min(...rates) * 100).toFixed(1) + "%",
    "Max Occupancy": (Math.max(...rates) * 100).toFixed(1) + "%",
    Full: geojson.features.filter((f) => f.properties.status === "full").length,
    High: geojson.features.filter((f) => f.properties.status === "high").length,
    Moderate: geojson.features.filter(
      (f) => f.properties.status === "moderate"
    ).length,
    Low: geojson.features.filter((f) => f.properties.status === "low").length,
    Filling: geojson.features.filter((f) => f.properties.trend === "filling")
      .length,
    Draining: geojson.features.filter(
      (f) => f.properties.trend === "draining"
    ).length,
    Stable: geojson.features.filter((f) => f.properties.trend === "stable")
      .length,
  };

  console.table(stats);
  return stats;
}

/**
 * Enable demo mode with user-friendly message
 */
export function enableDemoMode(simulator, timeMultiplier = 60) {
  if (!simulator) {
    console.error("Simulator not available");
    return;
  }

  simulator.config.demoTimeMultiplier = timeMultiplier;
  simulator.setDemoMode(true);
  console.log(
    `✅ Demo mode ENABLED (${timeMultiplier}x time acceleration)`
  );
  console.log("   Watch the occupancy change dramatically as simulated time flies!");
  console.log("   Disable with: window.parkingSimulator.setDemoMode(false)");
}

/**
 * Disable demo mode and return to real-time
 */
export function disableDemoMode(simulator) {
  if (!simulator) {
    console.error("Simulator not available");
    return;
  }

  simulator.setDemoMode(false);
  console.log("✅ Demo mode DISABLED (back to real-time)");
}

/**
 * Get current simulation time (handles demo mode)
 */
export function getSimulationTime(simulator) {
  if (!simulator) {
    console.error("Simulator not available");
    return;
  }

  const time = simulator.getSimulationTime();
  console.log(`Current simulation time: ${time.toLocaleString()}`);
  return time;
}

/**
 * Simulate a specific scenario (e.g., peak hours, game day, finals week)
 * This is a helper to jump to specific times quickly
 */
export function simulateScenario(simulator, scenario) {
  const scenarios = {
    earlyMorning: 6.0,
    morningRush: 8.5,
    midMorning: 10.0,
    peakHours: 11.5,
    afternoon: 14.0,
    evening: 18.0,
    night: 22.0,
  };

  if (!scenarios[scenario]) {
    console.error(
      `Unknown scenario. Available: ${Object.keys(scenarios).join(", ")}`
    );
    return;
  }

  // This requires access to internal time setting, which the current implementation doesn't expose
  // For now, just document the concept
  console.log(
    `Scenario "${scenario}" corresponds to hour ${scenarios[scenario]}`
  );
  console.log(
    "Note: To test different times, enable demo mode and let time advance naturally."
  );
}

export default {
  initializeSimulatorControls,
  getSummary,
  getStats,
  enableDemoMode,
  disableDemoMode,
  getSimulationTime,
  simulateScenario,
};
