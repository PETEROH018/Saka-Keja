import json
import os
from app import app
from models import db, UnitAmenity, UnitAmenityJoining, Unit

AMENITIES = [
    {"name": "WiFi Included", "description": "High-speed internet included in rent", "iconUrl": "wifi"},
    {"name": "Reliable Water", "description": "Consistent water supply, no rationing", "iconUrl": "droplet"},
    {"name": "Security Guard", "description": "24/7 on-site security personnel", "iconUrl": "shield"},
    {"name": "Furnished", "description": "Comes with basic furniture", "iconUrl": "sofa"},
]

# db.json sits one level up from backend/server/
DB_JSON_PATH = os.path.join(os.path.dirname(__file__), "..", "db.json")


def load_apartments():
    with open(DB_JSON_PATH, "r") as f:
        data = json.load(f)
    return data["apartments"]


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

        wifi, water, security, furnished = amenity_objects

        print("Loading apartments from db.json...")
        apartments = load_apartments()

        print(f"Seeding {len(apartments)} units...")
        units_by_apartment_id = {}
        for apt in apartments:
            unit = Unit(
                apartmentId=apt["id"],
                name=apt["name"],
                category=apt["property_type"],
            )
            db.session.add(unit)
            units_by_apartment_id[apt["id"]] = unit
        db.session.commit()

        print("Linking units to amenities based on real listing data...")
        links = []
        for apt in apartments:
            unit = units_by_apartment_id[apt["id"]]

            if apt.get("WiFi included"):
                links.append(UnitAmenityJoining(unitId=unit.id, amenityId=wifi.id))
            if apt.get("Water reliable"):
                links.append(UnitAmenityJoining(unitId=unit.id, amenityId=water.id))
            if apt.get("Security Guard"):
                links.append(UnitAmenityJoining(unitId=unit.id, amenityId=security.id))
            if apt.get("furnished"):
                links.append(UnitAmenityJoining(unitId=unit.id, amenityId=furnished.id))

        db.session.add_all(links)
        db.session.commit()

        print(f"Seeded {len(amenity_objects)} amenities, {len(apartments)} units, and {len(links)} links.")


if __name__ == "__main__":
    run()