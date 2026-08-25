from app import app
from models import db, UnitAmenity, UnitAmenityJoining, Unit

AMENITIES = [
    {"name": "WiFi Included", "description": "High-speed internet included in rent", "iconUrl": "wifi"},
    {"name": "Reliable Water", "description": "Consistent water supply, no rationing", "iconUrl": "droplet"},
    {"name": "Security Guard", "description": "24/7 on-site security personnel", "iconUrl": "shield"},
    {"name": "Furnished", "description": "Comes with basic furniture", "iconUrl": "sofa"},
    {"name": "Parking", "description": "Dedicated parking space", "iconUrl": "car"},
    {"name": "CCTV", "description": "Perimeter CCTV monitoring", "iconUrl": "camera"},
]


def run():
    with app.app_context():
        print("Creating tables (if they don't exist)...")
        db.create_all()

        print("Clearing existing unit amenity data...")
        UnitAmenityJoining.query.delete()
        UnitAmenity.query.delete()
        Unit.query.delete()

        print("Seeding unit_amenities...")
        amenity_objects = []
        for a in AMENITIES:
            amenity = UnitAmenity(**a)
            db.session.add(amenity)
            amenity_objects.append(amenity)
        db.session.commit()

        print("Seeding placeholder units...")
        unit_1 = Unit(category="bedsitter")
        unit_2 = Unit(category="one bedroom")
        db.session.add_all([unit_1, unit_2])
        db.session.commit()

        print("Linking units to amenities...")
        links = [
            UnitAmenityJoining(unitId=unit_1.id, amenityId=amenity_objects[0].id),
            UnitAmenityJoining(unitId=unit_1.id, amenityId=amenity_objects[1].id),
            UnitAmenityJoining(unitId=unit_2.id, amenityId=amenity_objects[2].id),
            UnitAmenityJoining(unitId=unit_2.id, amenityId=amenity_objects[3].id),
        ]
        db.session.add_all(links)
        db.session.commit()

        print(f"Seeded {len(amenity_objects)} amenities and {len(links)} unit links.")


if __name__ == "__main__":
    run()