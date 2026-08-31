import json
import os
from datetime import datetime, timezone
from app import app
from models import (
    db, 
    UnitAmenity, 
    UnitAmenityJoining, 
    Unit, 
    Apartment, 
    ApartmentAmenity, 
    ApartmentAmenityJoining, 
    NearbyFacility, 
    Payment, 
    Student, 
    StudentUnit, 
    ApartmentOwner
)

# ============================================================
# SEEDING SCRIPT
# ============================================================

with app.app_context():
    print("Clearing existing data...")
    db.drop_all()
    db.create_all()

    print("Seeding apartment owners...")
    
    owners_data = [
        {
            "full_name": "John Kamau",
            "email": "john.kamau@example.com",
            "phone_number": "254712345601",
            "location": "Westlands",
            "username": "johnkamau",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Mary Wanjiku",
            "email": "mary.wanjiku@example.com",
            "phone_number": "254712345602",
            "location": "Kilimani",
            "username": "marywanjiku",
            "password_hash": "Password123!"
        },
        {
            "full_name": "David Mwangi",
            "email": "david.mwangi@example.com",
            "phone_number": "254712345603",
            "location": "Lavington",
            "username": "davidmwangi",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Grace Njeri",
            "email": "grace.njeri@example.com",
            "phone_number": "254712345604",
            "location": "Kileleshwa",
            "username": "gracenjeri",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Peter Otieno",
            "email": "peter.otieno@example.com",
            "phone_number": "254712345605",
            "location": "Parklands",
            "username": "peterotieno",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Anne Akinyi",
            "email": "anne.akinyi@example.com",
            "phone_number": "254712345606",
            "location": "Karen",
            "username": "anneakinyi",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Samuel Kiptoo",
            "email": "samuel.kiptoo@example.com",
            "phone_number": "254712345607",
            "location": "Riverside",
            "username": "samuelkiptoo",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Lucy Wambui",
            "email": "lucy.wambui@example.com",
            "phone_number": "254712345608",
            "location": "Hurlingham",
            "username": "lucywambui",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Brian Ochieng",
            "email": "brian.ochieng@example.com",
            "phone_number": "254712345609",
            "location": "Loresho",
            "username": "brianochieng",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Faith Chebet",
            "email": "faith.chebet@example.com",
            "phone_number": "254712345610",
            "location": "Kasarani",
            "username": "faithchebet",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Kevin Maina",
            "email": "kevin.maina@example.com",
            "phone_number": "254712345611",
            "location": "Ngong Road",
            "username": "kevinmaina",
            "password_hash": "Password123!"
        },
        {
            "full_name": "Cynthia Atieno",
            "email": "cynthia.atieno@example.com",
            "phone_number": "254712345612",
            "location": "South C",
            "username": "cynthiaatieno",
            "password_hash": "Password123!"
        }
    ]

    for data in owners_data:
        raw_password = data.pop("password_hash")
        owner = ApartmentOwner(**data)
        owner.password_hash = raw_password
        db.session.add(owner)

    db.session.commit()
    print("Apartment owners seeded successfully.")

    print("Seeding apartments...")
    owners = ApartmentOwner.query.all()
    
    apartments_data = [
        {
            "name": "Savannah Heights",
            "type": "Apartment",
            "location": "Westlands",
            "description": "Modern student apartments close to prime amenities and transport hubs.",
            "owner_id": owners[0].id
        },
        {
            "name": "Acacia Court",
            "type": "Apartment",
            "location": "Kilimani",
            "description": "Secure, quiet, and fully furnished living spaces ideal for university scholars.",
            "owner_id": owners[1].id
        },
        {
            "name": "Valley View Residency",
            "type": "Apartment",
            "location": "Lavington",
            "description": "Spacious multi-bedroom units with high-speed internet and backup generators.",
            "owner_id": owners[2].id
        }
    ]

    apartments = []
    for apt_data in apartments_data:
        apartment = Apartment(**apt_data)
        db.session.add(apartment)
        apartments.append(apartment)
    
    db.session.commit()
    print("Apartments seeded successfully.")

    print("Seeding units...")
    unit_columns = [c.name for c in Unit.__table__.columns]

    units_data = [
        {
            "category": "Single", 
            "description": "Cozy single room with great lighting.", 
            "status": "Available", 
            "rent": 18000.0, 
            "deposit": 18000.0, 
            "bedrooms": 1, 
            "bathrooms": 1, 
            "size": 250, 
            "shared": False, 
            "promoted": True, 
            "current_occupants": 0, 
            "maximum_occupants": 1, 
            "imageURLS": [], 
            "apartment_id": apartments[0].id
        },
        {
            "category": "Double", 
            "description": "Spacious double room suitable for sharing.", 
            "status": "Available", 
            "rent": 25000.0, 
            "deposit": 25000.0, 
            "bedrooms": 1, 
            "bathrooms": 1, 
            "size": 350, 
            "shared": True, 
            "promoted": False, 
            "current_occupants": 0, 
            "maximum_occupants": 2, 
            "imageURLS": [], 
            "apartment_id": apartments[0].id
        },
        {
            "category": "Studio", 
            "description": "Modern studio apartment with kitchenette.", 
            "status": "Occupied", 
            "rent": 20000.0, 
            "deposit": 20000.0, 
            "bedrooms": 1, 
            "bathrooms": 1, 
            "size": 300, 
            "shared": False, 
            "promoted": True, 
            "current_occupants": 1, 
            "maximum_occupants": 1, 
            "imageURLS": [], 
            "apartment_id": apartments[1].id
        },
        {
            "category": "Single", 
            "description": "Quiet single room near study areas.", 
            "status": "Available", 
            "rent": 19000.0, 
            "deposit": 19000.0, 
            "bedrooms": 1, 
            "bathrooms": 1, 
            "size": 270, 
            "shared": False, 
            "promoted": False, 
            "current_occupants": 0, 
            "maximum_occupants": 1, 
            "imageURLS": [], 
            "apartment_id": apartments[1].id
        },
        {
            "category": "Double", 
            "description": "Large double room with balcony view.", 
            "status": "Available", 
            "rent": 28000.0, 
            "deposit": 28000.0, 
            "bedrooms": 2, 
            "bathrooms": 1, 
            "size": 400, 
            "shared": True, 
            "promoted": True, 
            "current_occupants": 0, 
            "maximum_occupants": 2, 
            "imageURLS": [], 
            "apartment_id": apartments[2].id
        },
    ]

    for unit_data in units_data:
        filtered_data = {k: v for k, v in unit_data.items() if k in unit_columns}
        unit = Unit(**filtered_data)
        db.session.add(unit)

    db.session.commit()
    print("Units seeded successfully.")

    print("Seeding students...")
    students_data = [
        {
            "full_name": "Brian Kiprop",
            "email": "brian.kiprop@student.com",
            "phone_number": "254798765432",
            "username": "briankiprop",
            "password_hash": "Student123!"
        },
        {
            "full_name": "Joy Mutheu",
            "email": "joy.mutheu@student.com",
            "phone_number": "254798765433",
            "username": "joymutheu",
            "password_hash": "Student123!"
        }
    ]

    for student_data in students_data:
        raw_password = student_data.pop("password_hash", None)
        student = Student(**student_data)
        if raw_password:
            student.password_hash = raw_password
        db.session.add(student)

    db.session.commit()
    print("Students seeded successfully.")
    print("Database seeding completed fully!")
    