/**
 * 
 * REFERENCES:
 * - GeoJSON specification: https://geojson.org/
 * - FeatureLayer (for live data): https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
 * - Query features: https://developers.arcgis.com/javascript/latest/query-feature-data/
 * - REST API example: https://developers.arcgis.com/javascript/latest/query-data-from-feature-service/
 */

export const parkingLots = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.50545851532486, 41.07590978852686]
      },
      properties: {
        id: "lot-1",
        name: "Lot 1",
        type: "surface",
        totalSpaces: 100,
        availableSpaces: 60,
        permitType: "Student/Faculty/Staff/Visitor",
        hourlyRate: 1.00,
        description: "Parking on outer campus"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5076615116506, 41.07628804817283]
      },
      properties: {
        id: "lot-4",
        name: "Lot 4",
        type: "surface",
        totalSpaces: 90,
        availableSpaces: 55,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51032, 41.07828]
      },
      properties: {
        id: "lot-24",
        name: "Lot 24",
        type: "surface",
        totalSpaces: 150,
        availableSpaces: 85,
        permitType: "Student/Faculty/Staff/Commuter/Overnight",
        hourlyRate: 1.00,
        description: "Surface lot - All permit types including overnight commuter parking"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51373003906953, 41.078686584819316]
      },
      properties: {
        id: "lot-27",
        name: "Lot 27",
        type: "surface",
        totalSpaces: 120,
        availableSpaces: 70,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51633905590212, 41.07596513524043]
      },
      properties: {
        id: "lot-34",
        name: "Lot 34",
        type: "surface",
        totalSpaces: 100,
        availableSpaces: 55,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5081595864345, 41.07788820563801]
      },
      properties: {
        id: "lot-14",
        name: "Lot 14",
        type: "surface",
        totalSpaces: 80,
        availableSpaces: 50,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5075957542346, 41.07739872678952]
      },
      properties: {
        id: "lot-3",
        name: "Lot 3",
        type: "surface",
        totalSpaces: 100,
        availableSpaces: 60,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.50690034661366, 41.074034050634694]
      },
      properties: {
        id: "lot-10",
        name: "Lot 10",
        type: "surface",
        totalSpaces: 90,
        availableSpaces: 45,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5097192974674, 41.07273304327922]
      },
      properties: {
        id: "lot-6",
        name: "Lot 6",
        type: "surface",
        totalSpaces: 70,
        availableSpaces: 35,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.50696428593399, 41.07160060144943]
      },
      properties: {
        id: "lot-9",
        name: "Lot 9",
        type: "surface",
        totalSpaces: 85,
        availableSpaces: 50,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51857998841692, 41.073340813759785]
      },
      properties: {
        id: "lot-47",
        name: "Lot 47",
        type: "surface",
        totalSpaces: 85,
        availableSpaces: 50,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface lot near Folk Hall"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51919994439982, 41.07760942164629]
      },
      properties: {
        id: "lot-49",
        name: "Lot 49",
        type: "surface",
        totalSpaces: 95,
        availableSpaces: 55,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51683373354226, 41.07350393577061]
      },
      properties: {
        id: "lot-46",
        name: "Lot 46",
        type: "surface",
        totalSpaces: 75,
        availableSpaces: 40,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51616529124898, 41.07224923684701]
      },
      properties: {
        id: "lot-44",
        name: "Lot 44",
        type: "surface",
        totalSpaces: 80,
        availableSpaces: 45,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface parking lot"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51465919902684, 41.07408193139396]
      },
      properties: {
        id: "lot-36",
        name: "Lot 36 (South Campus Parking Deck)",
        type: "garage",
        totalSpaces: 450,
        availableSpaces: 220,
        permitType: "Student/Faculty/Staff/Visitor",
        hourlyRate: 2.00,
        description: "Multi-level parking deck on south campus"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.50796, 41.07709] 
      },
      properties: {
        id: "lot-15",
        name: "Lot 15",
        type: "surface",
        totalSpaces: 25,
        availableSpaces: 10,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface lot near Olin Hall"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.50666, 41.07474] // Lot 8 - Near Recreation Center & Ocasek Natatorium
      },
      properties: {
        id: "lot-8",
        name: "Lot 8",
        type: "surface",
        totalSpaces: 80, // Estimate - update with actual capacity
        availableSpaces: 45,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Surface lot near Recreation Center and Ocasek Natatorium"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.50750, 41.07556] // Lot 3 - Fir-Hill lot near James Rhodes
      },
      properties: {
        id: "lot-3",
        name: "Lot 3 (Fir-Hill)",
        type: "surface",
        totalSpaces: 100,
        availableSpaces: 55,
        permitType: "Student/Faculty/Staff",
        hourlyRate: 1.00,
        description: "Fir-Hill lot near James Rhodes area"
      }
    },
    
    // {
    //   type: "Feature",
    //   geometry: {
    //     type: "Point",
    //     coordinates: [-81.5085, 41.0750] // South Parking Deck 
    //   },
    //   properties: {
    //     id: "lot-south-deck",
    //     name: "South Parking Deck",
    //     type: "garage",
    //     totalSpaces: 450,
    //     availableSpaces: 120,
    //     permitType: ["Student", "Faculty"],
    //     hourlyRate: 2.00,
    //     description: "Multi-level parking deck near student center "
    //   }
    // },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.51268936692537, 41.07870567073899] // North Parking Lot
      },
      properties: {
        id: "lot-north",
        name: "North Parking Lot",
        totalSpaces: 200,
        availableSpaces: 45,
        permitType: "Faculty/Staff",
        hourlyRate: 3.00,
        description: "Mainstream parking deck near northern campus buildings, contains a bridge from second floor over to access points for the Honors College and Rob's Cafe."
      }
    },
    // {
    //   type: "Feature",
    //   geometry: {
    //     type: "Point",
    //     coordinates: [-81.5095, 41.0720] // Exchange Street Deck
    //   },
    //   properties: {
    //     id: "lot-exchange",
    //     name: "Exchange Street Deck",
    //     totalSpaces: 600,
    //     availableSpaces: 280,
    //     permitType: "Student/Visitor",
    //     hourlyRate: 1.50,
    //     description: "Large parking deck with visitor access"
    //   }
    // },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5140, 41.0745]
      },
      properties: {
        id: "lot-west",
        name: "Lot 37 (Schrank Hall Parking Deck)",
        totalSpaces: 150,
        availableSpaces: 12,
        permitType: "Student",
        hourlyRate: 1.00,
        description: ""
      }
    },
    // },
    // {
    //   type: "Feature",
    //   geometry: {
    //     type: "Point",
    //     coordinates: [-81.5100, 41.0780] // Athletic Lot 41.074743100522035, -81.50666468321636
    //   },
    //   properties: {
    //     id: "lot-athletic",
    //     name: "Athletic Complex Lot",
    //     totalSpaces: 300,
    //     availableSpaces: 185,
    //     permitType: "Event/Student",
    //     hourlyRate: 2.50,
    //     description: "Parking for athletic events and recreation center"
    //   }
    // }
  ]
};

/**
 * Sample building/destination data for University of Akron campus
 */
export const buildings = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5105, 41.0745]
      },
      properties: {
        id: "bldg-student-union",
        name: "Student Union",
        category: "Student Services",
        description: "Main student center and dining"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5115, 41.0760]
      },
      properties: {
        id: "bldg-engineering",
        name: "College of Engineering",
        category: "Academic",
        description: "Engineering classrooms and labs"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5090, 41.0735]
      },
      properties: {
        id: "bldg-library",
        name: "Bierce Library",
        category: "Academic",
        description: "Main campus library"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5120, 41.0775]
      },
      properties: {
        id: "bldg-rec-center",
        name: "Student Recreation Center",
        category: "Recreation",
        description: "Fitness and wellness facility"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-81.5095, 41.0725]
      },
      properties: {
        id: "bldg-business",
        name: "College of Business",
        category: "Academic",
        description: "Business school and classrooms"
      }
    }
  ]
};

/**
 * Get available parking lots (those with spaces available)
 */
export function getAvailableParkingLots() {
  return parkingLots.features.filter(
    (lot) => lot.properties.availableSpaces > 0
  );
}

/**
 * Update parking lot availability (simulate real-time updates)
 */
export function updateParkingAvailability(lotId, availableSpaces) {
  const lot = parkingLots.features.find((f) => f.properties.id === lotId);
  if (lot) {
    lot.properties.availableSpaces = availableSpaces;
  }
}
