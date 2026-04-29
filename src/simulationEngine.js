/**
 * Parking Lot Simulation Engine
 * 
 * Models realistic parking demand based on:
 * - University class schedules (MWF/T-Th blocks)
 * - Time-of-day occupancy curves
 * - Lot-specific behavioral profiles
 * - Special event/state overrides (finals week, game days, etc.)
 */

// ============================================================================
// CLASS SCHEDULE DEFINITIONS
// ============================================================================

const CLASS_BLOCKS = {
  MWF: [
    { start: 7.5, end: 8.33 },      // 7:30–8:20
    { start: 8.58, end: 9.42 },     // 8:35–9:25
    { start: 9.67, end: 10.5 },     // 9:40–10:30
    { start: 10.75, end: 11.58 },   // 10:45–11:35
    { start: 11.83, end: 12.67 },   // 11:50–12:40
    { start: 12.92, end: 13.75 },   // 12:55–1:45
    { start: 14.0, end: 14.83 },    // 2:00–2:50
    { start: 15.08, end: 15.92 },   // 3:05–3:55
    { start: 16.17, end: 17.0 },    // 4:10–5:00
  ],
  TuTh: [
    { start: 7.75, end: 9.0 },      // 7:45–9:00
    { start: 9.25, end: 10.5 },     // 9:15–10:30
    { start: 10.75, end: 12.0 },    // 10:45–12:00
    { start: 12.25, end: 13.5 },    // 12:15–1:30
    { start: 14.0, end: 15.25 },    // 2:00–3:15
    { start: 15.5, end: 16.75 },    // 3:30–4:45
  ],
};

// Peak demand window: 8:35 AM to 1:45 PM
const PEAK_WINDOW = { start: 8.58, end: 13.75 };

// ============================================================================
// TIME-OF-DAY OCCUPANCY CURVES
// ============================================================================

const BASE_WEEKDAY_CURVE = {
  6: 0.05,
  7: 0.15,
  8: 0.55,
  9: 0.85,
  10: 0.9,
  11: 0.85,
  12: 0.75,
  13: 0.78,
  14: 0.8,
  15: 0.65,
  16: 0.45,
  17: 0.3,
  18: 0.4,
  19: 0.35,
  20: 0.25,
  21: 0.15,
  22: 0.05,
};

const WEEKEND_CURVE = {
  6: 0.02,
  9: 0.1,
  12: 0.2,
  14: 0.18,
  17: 0.1,
  20: 0.05,
};

// ============================================================================
// LOT BEHAVIORAL PROFILES
// ============================================================================

export const LOT_PROFILES = {
  "lot-1": {
    type: "surface",
    zone: "outer",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.8,
    eventOverride: "game_lot", // spikes on football days
    maxOccupancy: 0.97,
  },
  "lot-4": {
    type: "surface",
    zone: "mid",
    permitType: "mixed",
    overnightRetention: 0.15,
    peakSensitivity: 1.0,
    maxOccupancy: 0.97,
  },
  "lot-24": {
    type: "surface",
    zone: "central",
    permitType: "commuter",
    overnightRetention: 0.4,
    peakSensitivity: 1.2,
    maxOccupancy: 0.97,
  },
  "lot-27": {
    type: "surface",
    zone: "central",
    permitType: "mixed",
    overnightRetention: 0.05,
    peakSensitivity: 1.3,
    maxOccupancy: 0.97,
  },
  "lot-34": {
    type: "surface",
    zone: "mid",
    permitType: "faculty",
    overnightRetention: 0.2,
    peakSensitivity: 0.9,
    maxOccupancy: 0.97,
  },
  "lot-14": {
    type: "surface",
    zone: "mid",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 1.0,
    maxOccupancy: 0.97,
  },
  "lot-3": {
    type: "surface",
    zone: "central",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 1.15,
    maxOccupancy: 0.97,
  },
  "lot-10": {
    type: "surface",
    zone: "outer",
    permitType: "mixed",
    overnightRetention: 0.05,
    peakSensitivity: 0.7,
    maxOccupancy: 0.97,
  },
  "lot-6": {
    type: "surface",
    zone: "outer",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.75,
    eventOverride: "game_lot",
    maxOccupancy: 0.97,
  },
  "lot-9": {
    type: "surface",
    zone: "outer",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.75,
    maxOccupancy: 0.97,
  },
  "lot-47": {
    type: "surface",
    zone: "mid",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.95,
    maxOccupancy: 0.97,
  },
  "lot-49": {
    type: "garage",
    zone: "central",
    permitType: "mixed",
    overnightRetention: 0.2,
    peakSensitivity: 1.2,
    maxOccupancy: 0.95,
  },
  "lot-46": {
    type: "surface",
    zone: "mid",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.9,
    maxOccupancy: 0.97,
  },
  "lot-44": {
    type: "surface",
    zone: "mid",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.85,
    maxOccupancy: 0.97,
  },
  "lot-36": {
    type: "garage",
    zone: "central",
    permitType: "mixed",
    overnightRetention: 0.15,
    peakSensitivity: 1.25,
    maxOccupancy: 0.95,
  },
  "lot-15": {
    type: "surface",
    zone: "central",
    permitType: "mixed",
    overnightRetention: 0.05,
    peakSensitivity: 1.1,
    maxOccupancy: 0.97,
  },
  "lot-8": {
    type: "surface",
    zone: "mid",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 0.95,
    maxOccupancy: 0.97,
  },
  "lot-3-fir": {
    type: "surface",
    zone: "central",
    permitType: "mixed",
    overnightRetention: 0.1,
    peakSensitivity: 1.1,
    maxOccupancy: 0.97,
  },
  "lot-north": {
    type: "garage",
    zone: "central",
    permitType: "faculty",
    overnightRetention: 0.3,
    peakSensitivity: 1.15,
    maxOccupancy: 0.95,
  },
};

// ============================================================================
// ZONE AND TIME MULTIPLIERS
// ============================================================================

function getZoneMultiplier(zone) {
  const multipliers = {
    central: 1.3,
    mid: 1.0,
    outer: 0.65,
  };
  return multipliers[zone] || 1.0;
}

function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function getDayType(date) {
  const day = date.getDay();
  if (day === 0 || day === 6) return "weekend";
  if (day === 1 || day === 3 || day === 5) return "MWF";
  return "TuTh";
}

function getDecimalHour(date) {
  return date.getHours() + date.getMinutes() / 60;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function linearInterpolate(x, points) {
  const sortedHours = Object.keys(points)
    .map(Number)
    .sort((a, b) => a - b);

  if (x <= sortedHours[0]) return points[sortedHours[0]];
  if (x >= sortedHours[sortedHours.length - 1])
    return points[sortedHours[sortedHours.length - 1]];

  for (let i = 0; i < sortedHours.length - 1; i++) {
    const h1 = sortedHours[i];
    const h2 = sortedHours[i + 1];
    if (x >= h1 && x <= h2) {
      const v1 = points[h1];
      const v2 = points[h2];
      const t = (x - h1) / (h2 - h1);
      return v1 + t * (v2 - v1);
    }
  }
  return points[sortedHours[sortedHours.length - 1]];
}

function gaussianRandom(mean = 0, stdDev = 1) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return z * stdDev + mean;
}

function getClassScheduleBlocks(date) {
  const dayType = getDayType(date);
  return dayType === "MWF" ? CLASS_BLOCKS.MWF : CLASS_BLOCKS.TuTh;
}

function isInTransitionSurge(decimalHour, blocks, surgeWindow = 5) {
  for (const block of blocks) {
    const surgeStart = block.end;
    const surgeEnd = block.end + surgeWindow / 60;
    if (decimalHour >= surgeStart && decimalHour <= surgeEnd) {
      return true;
    }
  }
  return false;
}

function isOvernightHours(decimalHour) {
  // Overnight hours: 9 PM to 6 AM (21:00 to 6:00)
  return decimalHour >= 21 || decimalHour < 6;
}

// ============================================================================
// SPECIAL STATE DETECTION
// ============================================================================

function checkSpecialStates(date) {
  const states = {
    isFinalWeek: false,
    isBreak: false,
    isFirstWeekOfSemester: false,
    isGameDay: false,
    isEventNight: false,
  };

  // Simplified: assume finals in last 2 weeks of April/December, first 2 weeks of semester
  const month = date.getMonth();
  const dateOfMonth = date.getDate();

  if ((month === 3 && dateOfMonth >= 16) || (month === 11 && dateOfMonth >= 16)) {
    states.isFinalWeek = true;
  }

  if (
    (month === 4 && dateOfMonth <= 7) ||
    (month === 0 && dateOfMonth <= 14)
  ) {
    states.isFirstWeekOfSemester = true;
  }

  // Demo: treat 15th of each month as game day
  if (dateOfMonth === 15) {
    states.isGameDay = true;
  }

  // Demo: EJ Thomas events on Fridays 6–10 PM
  if (date.getDay() === 5 && getDecimalHour(date) >= 18 && getDecimalHour(date) <= 22) {
    states.isEventNight = true;
  }

  return states;
}

// ============================================================================
// MAIN OCCUPANCY CALCULATION
// ============================================================================

function calculateOccupancy(date, lotId, profile, config, previousOccupancy = null) {
  const decimalHour = getDecimalHour(date);
  const curve = isWeekend(date) ? WEEKEND_CURVE : BASE_WEEKDAY_CURVE;
  const specialStates = checkSpecialStates(date);

  // Base occupancy from time-of-day curve
  let baseOccupancy = linearInterpolate(decimalHour, curve);

  // Apply special state overrides
  if (specialStates.isFinalWeek) {
    baseOccupancy = 0.6; // Flatten to 60% during finals
  } else if (specialStates.isFirstWeekOfSemester && profile.zone === "central") {
    baseOccupancy = Math.min(baseOccupancy + 0.15, 0.95); // Overcrowding boost
  }

  // Check for class transition surge
  let transitionSurge = 0;
  if (config.useScheduleData) {
    const blocks = getClassScheduleBlocks(date);
    if (
      isInTransitionSurge(
        decimalHour,
        blocks,
        config.transitionSurgeDuration
      )
    ) {
      transitionSurge = 0.1; // 10% additional surge during transitions
    }
  }

  // Apply zone multiplier
  const zoneMultiplier = getZoneMultiplier(profile.zone);

  // Check if in peak window for additional sensitivity boost
  let peakBoost = 0;
  if (
    decimalHour >= PEAK_WINDOW.start &&
    decimalHour <= PEAK_WINDOW.end
  ) {
    peakBoost = (profile.peakSensitivity - 1.0) * 0.15;
  }

  // Combine components
  let occupancy =
    (baseOccupancy + transitionSurge) * zoneMultiplier * (1 + peakBoost);

  // Apply overnight retention (minimum occupancy during night hours)
  if (isOvernightHours(decimalHour)) {
    // During overnight (9 PM – 6 AM), some cars stay parked
    // Commuter lots with high retention stay fuller, others drain more
    const overnightFloor = profile.overnightRetention * 0.5; // Baseline retention
    occupancy = Math.max(occupancy, overnightFloor);
  }

  // Apply event overrides
  if (specialStates.isGameDay && profile.eventOverride === "game_lot") {
    occupancy = 0.95;
  }
  if (specialStates.isEventNight && lotId === "lot-49") {
    // Lot 49 near EJ Thomas
    occupancy = 0.9;
  }

  // Add Gaussian noise for realistic variation
  occupancy += gaussianRandom(0, config.noiseStdDev);

  // Garage fill/drain lag: smooth change if previous occupancy exists
  if (profile.type === "garage" && previousOccupancy !== null) {
    const lag = 0.85; // Garages change slower
    occupancy = previousOccupancy * lag + occupancy * (1 - lag);
  }

  // Clamp to max occupancy
  occupancy = Math.min(occupancy, profile.maxOccupancy);
  occupancy = Math.max(occupancy, 0);

  return occupancy;
}

// ============================================================================
// STATUS AND TREND CALCULATION
// ============================================================================

function getStatus(occupancyRate) {
  if (occupancyRate > 0.9) return "full";
  if (occupancyRate > 0.7) return "high";
  if (occupancyRate > 0.4) return "moderate";
  return "low";
}

function getTrend(currentOccupancy, previousOccupancy) {
  if (previousOccupancy === null) return "stable";
  const delta = currentOccupancy - previousOccupancy;
  if (delta > 0.05) return "filling";
  if (delta < -0.05) return "draining";
  return "stable";
}

// ============================================================================
// PARKING SIMULATOR CLASS
// ============================================================================

export class ParkingSimulator {
  constructor(parkingLotsGeoJSON, config = {}) {
    this.config = {
      updateIntervalMs: 300000, // 5 minutes
      demoMode: false,
      demoTimeMultiplier: 60, // 60x acceleration for demos
      noiseStdDev: 0.04,
      transitionSurgeEnabled: true,
      transitionSurgeDuration: 10, // minutes
      useScheduleData: true,
      ...config,
    };

    this.geojson = parkingLotsGeoJSON;
    this.occupancyHistory = new Map(); // Track previous occupancy for trend
    this.simulationTime = new Date();
    this.isRunning = false;
    this.updateCallbacks = [];

    this._initializeOccupancyHistory();
  }

  _initializeOccupancyHistory() {
    for (const feature of this.geojson.features) {
      const lotId = feature.properties.id;
      const rate = feature.properties.availableSpaces / feature.properties.totalSpaces;
      this.occupancyHistory.set(lotId, rate);
    }
  }

  /**
   * Get the current simulation time (respects demoMode acceleration)
   */
  getSimulationTime() {
    if (this.config.demoMode) {
      const realElapsed = Date.now() - this._demoModeStart;
      const simElapsed = realElapsed * this.config.demoTimeMultiplier;
      return new Date(this._demoModeInitialTime.getTime() + simElapsed);
    }
    return new Date();
  }

  /**
   * Update all lot occupancies based on current time
   */
  updateOccupancies() {
    const currentTime = this.getSimulationTime();

    for (const feature of this.geojson.features) {
      const lotId = feature.properties.id;
      const profile = LOT_PROFILES[lotId];

      if (!profile) {
        console.warn(`No profile for lot ${lotId}`);
        continue;
      }

      const totalSpaces = feature.properties.totalSpaces;
      const previousOccupancyRate = this.occupancyHistory.get(lotId);

      const newOccupancyRate = calculateOccupancy(
        currentTime,
        lotId,
        profile,
        this.config,
        previousOccupancyRate
      );

      const availableSpaces = Math.round(
        totalSpaces * (1 - newOccupancyRate)
      );

      // Update properties
      feature.properties.availableSpaces = Math.max(0, availableSpaces);
      feature.properties.occupancyRate = newOccupancyRate;
      feature.properties.status = getStatus(newOccupancyRate);
      feature.properties.trend = getTrend(
        newOccupancyRate,
        previousOccupancyRate
      );
      feature.properties.lastUpdated = currentTime.toISOString();

      // Store in history for next calculation
      this.occupancyHistory.set(lotId, newOccupancyRate);
    }

    // Notify all callbacks
    this._notifyCallbacks();
  }

  /**
   * Register a callback to be called when occupancies update
   */
  onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }

  _notifyCallbacks() {
    for (const callback of this.updateCallbacks) {
      callback(this.geojson);
    }
  }

  /**
   * Start the simulation loop
   */
  start() {
    if (this.isRunning) {
      console.warn("Simulator already running");
      return;
    }

    if (this.config.demoMode) {
      this._demoModeInitialTime = new Date();
      this._demoModeStart = Date.now();
    }

    this.isRunning = true;
    this._runSimulationLoop();
  }

  /**
   * Stop the simulation loop
   */
  stop() {
    this.isRunning = false;
    if (this.updateHandle) {
      clearTimeout(this.updateHandle);
    }
  }

  _runSimulationLoop() {
    this.updateOccupancies();

    if (this.isRunning) {
      this.updateHandle = setTimeout(
        () => this._runSimulationLoop(),
        this.config.updateIntervalMs
      );
    }
  }

  /**
   * Manually trigger an update (for immediate feedback)
   */
  updateNow() {
    this.updateOccupancies();
  }

  /**
   * Get current state as GeoJSON
   */
  getGeoJSON() {
    return this.geojson;
  }

  /**
   * Set demo mode and return to real time
   */
  setDemoMode(enabled) {
    this.config.demoMode = enabled;
    if (enabled) {
      this._demoModeInitialTime = new Date();
      this._demoModeStart = Date.now();
    }
  }
}

export default ParkingSimulator;
