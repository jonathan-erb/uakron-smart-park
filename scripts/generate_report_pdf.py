from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.enums import TA_LEFT

pdf_path = "SmartParkU_Week5_Report.pdf"

title = "SmartParkU — Week 5 Status Report"

paragraphs = [
    "The SmartParkU project aims to evolve the existing UAkron Smart Park prototype into a configurable, multi-university smart parking platform, delivered as a responsive web application and a native iOS app. The platform’s primary goals are to help users locate appropriate parking quickly, visualize parking supply and demand on an interactive map, support campus-specific configurations without changing core logic, and enable location-aware mobile usage with offline capabilities for iOS.",

    "To date we have completed Phase 1 (Planning & Setup) and the Map Foundation work from Weeks 3–4: the Vite project is initialized, the ArcGIS campus basemap and building layers are in place, example scripts live in the examples/ folder, the parking CSV has been ingested and cleaned, geocoding has been run against campus records, and an initial parkingFinder that uses straight-line distance is implemented and demonstrable. Current Week 5 activities concentrate on Phase 2 priorities: finishing the parking dataset population and validation, refining the distance/matching and ranking logic in parkingFinder, adding availability indicators to the parking feature layer, and improving client-side performance via indexing and lazy-loading. Known risks such as data quality and load-time performance are being mitigated with cleaning scripts and incremental loading.",

    "We intentionally trimmed advanced analytics and historical-trends work from the immediate scope to ensure core features are robust for the demo milestone. Near-term next steps are to complete robust search and ranking improvements by the end of Week 6, integrate routing and richer UI controls in Weeks 7–8, and implement admin interfaces, real-time update hooks, and accessibility testing in Weeks 9–11, followed by user testing and polishing in Weeks 12–13 and deployment/demo preparation in Week 14.",

    "The iOS (Swift) plan is lightweight and aligned to this timeline: scaffold a SwiftUI app and verify MapKit or ArcGIS Runtime integration with test GeoJSON in Week 7; implement a simple search UI, caching, and basic offline basemap support in Week 8; and polish UX and produce a demo build in Week 9. To reduce risk, the app will initially be read-only (map + search) and will reuse server-side processing or the web app’s processed GeoJSON/REST endpoints for ranking and filtering.",

    "Team contributions to date: Jonathan — lead technical architect who adapted the original UAkron codebase for multi-campus support, implemented the ArcGIS map and parking feature layer, ran geocoding and data cleanup, and authored the initial parkingFinder logic and example scripts; Avery — data lead who organized dataset structure, wrote validation/cleaning scripts, populated campus CSVs, and coordinated testing; Lana — UX/UI lead who designed interface layouts, implemented admin/search panels and responsive styling, and led accessibility reviews."
]

# Document setup
styles = getSampleStyleSheet()
style_title = ParagraphStyle(
    "Title",
    parent=styles["Heading1"],
    fontSize=16,
    leading=18,
    spaceAfter=8,
    alignment=TA_LEFT,
)

style_body = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontSize=10,
    leading=12,
)

# Build PDF
doc = SimpleDocTemplate(pdf_path, pagesize=letter,
                        rightMargin=40, leftMargin=40,
                        topMargin=40, bottomMargin=40)
story = []
story.append(Paragraph(title, style_title))
story.append(Spacer(1, 6))
for p in paragraphs:
    story.append(Paragraph(p, style_body))
    story.append(Spacer(1, 8))

try:
    doc.build(story)
    print(f"PDF generated: {pdf_path}")
except Exception as e:
    print("Failed to generate PDF:", e)
