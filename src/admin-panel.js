/**
 * Admin panel for updating parking availability
 * Simulates real-time sensor data by allowing manual updates via REST API
 */

/**
 * Update a parking lot's available spaces in ArcGIS Online
 * @param {string} featureServiceUrl - Base Feature Service URL
 * @param {string} apiKey - Your ArcGIS API key
 * @param {string} lotId - The parking lot ID
 * @param {number} newAvailableSpaces - New available space count
 */
export async function updateParkingAvailability(featureServiceUrl, apiKey, lotId, newAvailableSpaces) {
  try {
    // Step 1: Query to find the feature with this lot ID
    const queryUrl = `${featureServiceUrl}/query`;
    const queryParams = new URLSearchParams({
      where: `id='${lotId}'`,
      outFields: '*',
      returnGeometry: 'false',
      f: 'json',
      token: apiKey
    });

    const queryResponse = await fetch(`${queryUrl}?${queryParams}`);
    const queryData = await queryResponse.json();

    if (!queryData.features || queryData.features.length === 0) {
      throw new Error(`Parking lot ${lotId} not found`);
    }

    const feature = queryData.features[0];
    const objectId = feature.attributes.OBJECTID || feature.attributes.FID;

    // Step 2: Update the feature
    const updateUrl = `${featureServiceUrl}/updateFeatures`;
    
    const updateFeature = {
      attributes: {
        OBJECTID: objectId,
        availableSpaces: newAvailableSpaces
      }
    };

    const updateParams = new URLSearchParams({
      features: JSON.stringify([updateFeature]),
      f: 'json',
      token: apiKey
    });

    const updateResponse = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: updateParams
    });

    const updateResult = await updateResponse.json();

    if (updateResult.updateResults && updateResult.updateResults[0].success) {
      console.log(`Updated ${lotId} to ${newAvailableSpaces} available spaces`);
      return { success: true, lotId, newAvailableSpaces };
    } else {
      throw new Error(updateResult.error?.message || 'Update failed');
    }

  } catch (error) {
    console.error('Error updating parking availability:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Simulate random parking changes (for demo purposes)
 * @param {string} featureServiceUrl 
 * @param {string} apiKey 
 * @param {Array} parkingLots - Array of lot IDs
 */
export async function simulateRealtimeUpdates(featureServiceUrl, apiKey, parkingLots) {
  console.log('🔄 Starting simulated real-time updates...');
  
  setInterval(async () => {
    // Pick a random lot
    const randomLot = parkingLots[Math.floor(Math.random() * parkingLots.length)];
    
    // Simulate a change (±5 spaces)
    const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
    
    // You'd need to track current values or query first
    console.log(`Simulating ${change > 0 ? '+' : ''}${change} spaces for ${randomLot.id}`);
    
    // For demo, just log it. In production, you'd:
    // await updateParkingAvailability(featureServiceUrl, apiKey, randomLot.id, newValue);
    
  }, 30000); // Update every 30 seconds
}

/**
 * Create a simple UI for manual updates (for testing)
 */
export function createAdminUI(featureServiceUrl, apiKey) {
  const adminPanel = document.createElement('div');
  adminPanel.id = 'admin-panel';
  adminPanel.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 1000;
    width: 300px;
  `;

  adminPanel.innerHTML = `
    <h3 style="margin-top: 0;">Admin: Update Parking</h3>
    <div style="margin-bottom: 10px;">
      <label>Lot ID:</label>
      <input type="text" id="lot-id" placeholder="lot-1" style="width: 100%; padding: 5px;" />
    </div>
    <div style="margin-bottom: 10px;">
      <label>Available Spaces:</label>
      <input type="number" id="available-spaces" placeholder="50" style="width: 100%; padding: 5px;" />
    </div>
    <button id="update-btn" style="width: 100%; padding: 10px; background: #0079c1; color: white; border: none; border-radius: 4px; cursor: pointer;">
      Update
    </button>
    <div id="admin-status" style="margin-top: 10px; font-size: 12px;"></div>
  `;

  document.body.appendChild(adminPanel);

  // Handle update button
  document.getElementById('update-btn').addEventListener('click', async () => {
    const lotId = document.getElementById('lot-id').value;
    const spaces = parseInt(document.getElementById('available-spaces').value);
    const statusDiv = document.getElementById('admin-status');

    if (!lotId || isNaN(spaces)) {
      statusDiv.innerHTML = '<span style="color: red;">Please fill all fields</span>';
      return;
    }

    statusDiv.innerHTML = '<span style="color: blue;">Updating...</span>';

    const result = await updateParkingAvailability(featureServiceUrl, apiKey, lotId, spaces);

    if (result.success) {
      statusDiv.innerHTML = `<span style="color: green;">✅ Updated ${lotId}!</span>`;
    } else {
      statusDiv.innerHTML = `<span style="color: red;">❌ ${result.error}</span>`;
    }
  });
}
