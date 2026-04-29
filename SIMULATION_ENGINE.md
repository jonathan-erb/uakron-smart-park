# Parking Lot Simulation Engine Documentation

## Overview

The **Parking Lot Simulation Engine** provides realistic, time-based simulation of parking lot occupancy at the University of Akron. Instead of static parking data, the system now dynamically calculates availability based on:

- **Class Schedules**: MWF and T/Th course blocks trigger demand surges at transition times
- **Time-of-Day Patterns**: Campus follows predictable occupancy curves (quiet early morning → busy peak hours → quieter evenings)
- **Lot-Specific Behaviors**: Different lots respond differently to demand (garages fill faster, outer lots stay emptier)
- **Special Events**: Holidays, finals weeks, game days, and events create occupancy spikes
- **Realistic Noise**: Gaussian variation makes the simulation feel natural, not robotic

---

## Key Features

### 1. **Class Schedule Integration**
The simulator uses actual University of Akron class meeting patterns:
- **MWF blocks**: 50-minute classes (7:30 AM – 5:00 PM)
- **T/Th blocks**: 75–100 minute classes (7:45 AM – 5:35 PM)
- **Peak window**: 8:35 AM – 1:45 PM (highest demand)
- **Transition surges**: When a class ends, demand spikes as people arrive and depart

### 2. **Time-of-Day Curves**
Occupancy follows campus activity patterns:
- **6 AM**: 5% full (overnight retention)
- **8–11 AM**: 55–90% full (morning classes)
- **12–2 PM**: 75–80% full (lunch + class transitions)
- **3–5 PM**: 45–65% full (afternoon classes wind down)
- **After 5 PM**: 30–40% (evening activities, fewer parkers)
- **Weekend**: Significantly lower demand (much flatter curve)

### 3. **Lot Profiles**
Each parking lot has configurable behavior:
- **Type**: Surface lot or garage (garages fill faster, cap at 95%)
- **Zone**: Central (high demand, 1.3x multiplier), Mid (1.0x), Outer (low demand, 0.65x)
- **Permit Type**: Commuter (overnight retention), Faculty/Staff, Mixed
- **Peak Sensitivity**: How aggressively lots fill during peak hours
- **Special Events**: Some lots spike on game days or event nights

### 4. **Special State Overrides**
```
- FINALS_WEEK:  Flatten occupancy to 60% all day (studying reduces parking churn)
- FIRST_WEEK_OF_SEMESTER: Central lots +15% (overcrowding effect)
- GAME_DAY: Event lots spike to 95%
- EVENT_NIGHT: EJ Thomas area lots spike 6–10 PM
- HOLIDAY/BREAK: Use weekend curve × 0.4
```

### 5. **Realistic Dynamics**
- **Garage fill/drain lag**: Garages change occupancy slower than surface lots (realistic)
- **Gaussian noise**: Each lot "breathes" naturally with ±4% random variation
- **Trend tracking**: "Filling", "Draining", or "Stable" status helps users understand direction
- **Status indicators**: "Full" (>90%), "High" (70–90%), "Moderate" (40–70%), "Low" (<40%)

---

## How It Works

### Occupancy Calculation Process

For each parking lot, every 5 minutes:

1. **Base occupancy** from time-of-day curve (e.g., 85% at 10 AM)
2. **Zone multiplier** applied (central lots attract more demand)
3. **Class schedule surge** added if currently in transition time (+10%)
4. **Peak sensitivity boost** applied during peak window (if applicable)
5. **Gaussian noise** added for realism (±4% variance)
6. **Garage lag** smoothed for realistic fill/drain speed
7. **Capped** at max occupancy (97% for surface, 95% for garages)

### Example Timeline (Weekday)

```
6:00 AM   → 5% full (overnight commuters)
7:00 AM   → 15% full (early arrivals)
8:00 AM   → 55% full (morning classes begin)
8:35 AM   → 70% full (class transition surge begins)
9:00 AM   → 85% full (peak demand window opens)
9:25 AM   → 90% full (end of 9:25 class → big surge)
10:00 AM  → 90% full (peak continues)
11:00 AM  → 85% full (some lot hopping)
12:00 PM  → 75% full (lunch break, some departures)
1:00 PM   → 78% full (afternoon class arrivals)
2:00 PM   → 80% full (sustained afternoon demand)
3:00 PM   → 65% full (afternoon classes end, people leave)
4:00 PM   → 45% full (evening wind-down)
5:00 PM   → 30% full (end of work day for some)
6:00 PM   → 40% full (evening activities pickup)
```

---

## Using the Simulator

### Initialization

The simulator is automatically initialized when the map loads:

```javascript
// In main.js:
const simulator = new ParkingSimulator(parkingLots, {
  updateIntervalMs: 300000,        // 5 minutes real-time
  demoMode: false,                 // Real-time mode
  noiseStdDev: 0.04,
  transitionSurgeEnabled: true,
  useScheduleData: true,
});

simulator.start();
```

### Browser Console Commands

The simulator is exposed to the window for easy demo/debugging:

#### **View Current Occupancy**
```javascript
// Get a formatted table
window.parkingSimulator.getGeoJSON().features.forEach(f => {
  console.log(`${f.properties.name}: ${f.properties.availableSpaces}/${f.properties.totalSpaces} 
              (${(f.properties.occupancyRate*100).toFixed(0)}% full, ${f.properties.status})`);
});
```

#### **Enable Demo Mode (60x Time Acceleration)**
```javascript
window.parkingSimulator.setDemoMode(true);
// Watch occupancy change dramatically as 5 minutes of real-time = 5 hours of sim-time
```

#### **Disable Demo Mode (Return to Real-Time)**
```javascript
window.parkingSimulator.setDemoMode(false);
```

#### **Trigger Manual Update**
```javascript
window.parkingSimulator.updateNow();
```

#### **Get Occupancy Summary**
```javascript
import { getSummary } from './src/simulatorControls.js';
getSummary(window.parkingSimulator);
```

#### **Get Statistics**
```javascript
import { getStats } from './src/simulatorControls.js';
getStats(window.parkingSimulator);
```

#### **Stop/Start Simulation**
```javascript
window.parkingSimulator.stop();   // Freeze occupancy
window.parkingSimulator.start();  // Resume
```

#### **Change Update Interval**
```javascript
// Update every 10 seconds instead of 5 minutes
window.parkingSimulator.config.updateIntervalMs = 10000;
```

#### **Disable Noise (for testing)**
```javascript
// Make occupancy changes predictable
window.parkingSimulator.config.noiseStdDev = 0;
```

---

## Data Structures

### GeoJSON Feature Properties (Updated Each Cycle)

```javascript
{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [lon, lat] },
  "properties": {
    "id": "lot-24",
    "name": "Lot 24",
    "type": "surface",
    "totalSpaces": 150,
    "availableSpaces": 85,           // ✨ UPDATED BY SIMULATOR
    "occupancyRate": 0.433,          // ✨ UPDATED BY SIMULATOR (0.0–1.0)
    "status": "moderate",            // ✨ UPDATED BY SIMULATOR ("low", "moderate", "high", "full")
    "trend": "stable",               // ✨ UPDATED BY SIMULATOR ("filling", "draining", "stable")
    "lastUpdated": "2026-04-28T...", // ✨ UPDATED BY SIMULATOR (ISO 8601)
    "permitType": "Student/Faculty/Staff/Commuter/Overnight",
    "hourlyRate": 1.00,
    "description": "Surface lot - All permit types including overnight commuter parking"
  }
}
```

### Lot Profile Structure

```javascript
{
  "lot-24": {
    "type": "surface",                    // "surface" | "garage"
    "zone": "central",                    // "central" | "mid" | "outer"
    "permitType": "commuter",
    "overnightRetention": 0.4,            // 0.0–1.0 (how much stays overnight)
    "peakSensitivity": 1.2,               // 1.0 = normal, >1 = fills faster
    "maxOccupancy": 0.97,                 // Physical cap (garages: 0.95)
    "eventOverride": "game_lot"           // Optional: "game_lot", etc.
  }
}
```

---

## Configuration Options

```javascript
const config = {
  updateIntervalMs: 300000,              // How often to recalculate (5 min)
  demoMode: false,                       // 60x time acceleration for demos
  demoTimeMultiplier: 60,                // Adjust acceleration factor
  noiseStdDev: 0.04,                     // Gaussian noise stddev (0 = no noise)
  transitionSurgeEnabled: true,          // Class transition spikes
  transitionSurgeDuration: 10,           // Surge window (minutes)
  useScheduleData: true,                 // Use class schedules in calculation
};
```

---

## Customization

### Adding a New Lot

1. Add the lot to `parkingData.js`
2. Add a profile to `LOT_PROFILES` in `simulationEngine.js`:

```javascript
"lot-myNewLot": {
  type: "surface",
  zone: "central",
  permitType: "mixed",
  overnightRetention: 0.1,
  peakSensitivity: 1.0,
  maxOccupancy: 0.97,
}
```

### Tuning Time-of-Day Curves

Edit `BASE_WEEKDAY_CURVE` and `WEEKEND_CURVE` in `simulationEngine.js`:

```javascript
const BASE_WEEKDAY_CURVE = {
  6: 0.05,   // 6 AM: 5% full
  7: 0.15,   // 7 AM: 15% full
  // ... adjust as needed
};
```

### Adding Special Events

In `checkSpecialStates()`, add your own logic:

```javascript
if (date.getMonth() === 8 && date.getDate() === 1) {
  states.isAcademicConvocation = true; // Example
}
```

Then apply overrides in `calculateOccupancy()`:

```javascript
if (specialStates.isAcademicConvocation && profile.zone === "central") {
  occupancy += 0.20; // All central lots +20%
}
```

---

## Demo Workflow

### Quick 5-Minute Demo

1. Open the app in browser
2. Open browser DevTools console
3. Run:
   ```javascript
   window.parkingSimulator.setDemoMode(true);
   ```
4. Watch occupancy change dramatically every 5 seconds (= 5 hours in sim-time)
5. Return to real-time:
   ```javascript
   window.parkingSimulator.setDemoMode(false);
   ```

### Scenario Testing

- **Morning rush** (~8:35 AM): Central lots fill, outer lots half-empty
- **Peak hours** (~11 AM): Nearly everything full
- **Lunch break** (~12:15 PM): Slight dip, then surge as people return
- **Afternoon** (~2–3 PM): Moderate occupancy
- **Evening** (~5+ PM): Most lots emptying

Enable demo mode and watch these patterns play out over 10 real-time seconds!

---

## Technical Details

### Class Transition Surge Logic

When a class block ends (e.g., 9:25 AM on MWF):
- Occupancy dips ~5–8% as people leave (5-minute departure wave)
- Immediately rises ~10–15% as new arrivals park (5-minute arrival wave)
- Net effect: visible spike at every class transition

### Garage Fill/Drain Lag

Garages change occupancy more slowly than surface lots (realistic):
```javascript
if (profile.type === "garage") {
  // Use 85% of previous occupancy + 15% of new calculated value
  occupancy = previousOccupancy * 0.85 + occupancy * 0.15;
}
```

### Zone Multipliers

- **Central** (1.3x): High-demand areas near academic buildings
- **Mid** (1.0x): Moderate-demand mid-campus
- **Outer** (0.65x): Low-demand peripheral lots

---

## Troubleshooting

### Occupancy Not Changing?
- Ensure simulator is running: `window.parkingSimulator.isRunning`
- Check interval: `window.parkingSimulator.config.updateIntervalMs`
- Try manual update: `window.parkingSimulator.updateNow()`

### Unrealistic Occupancy Patterns?
- Check if noise is too high: Lower `noiseStdDev` to 0.02 or 0
- Verify time-of-day curve values look reasonable
- Check lot profile peak sensitivity multipliers

### Want Faster Updates for Demo?
```javascript
window.parkingSimulator.config.updateIntervalMs = 5000; // Every 5 seconds
window.parkingSimulator.stop();
window.parkingSimulator.start();
```

---

## Future Enhancements

- [ ] Integrate real IoT sensor data to calibrate curves
- [ ] Add historical data analysis to refine patterns
- [ ] Support user-submitted availability confirmations
- [ ] Machine learning to predict future occupancy
- [ ] Integration with campus events calendar (automatic game day detection)
- [ ] Mobile app with real-time push notifications
- [ ] Reservation system based on predicted availability

---

## References

- **Class Schedule Data**: University of Akron standard meeting patterns
- **Occupancy Curves**: Based on typical campus parking research
- **Lot Profiles**: Informed by UAkron parking infrastructure audit

