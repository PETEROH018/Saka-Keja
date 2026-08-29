import json
import os
from datetime import datetime,timezone
from app import app
from models import db, UnitAmenity, UnitAmenityJoining, Unit, Apartment, ApartmentAmenity, ApartmentAmenityJoining, NearbyFacility, Payment, Student, StudentUnit, ApartmentOwner
from werkzeug.security import generate_password_hash


# ============================================================
# APARTMENT OWNERS
# ============================================================

owners_data = [
    {
        "full_name": "John Kamau",
        "email": "john.kamau@example.com",
        "phone_number": 254712345601,
        "location": "Westlands",
        "username": "johnkamau",
        "password": "Password123!"
    },
    {
        "full_name": "Mary Wanjiku",
        "email": "mary.wanjiku@example.com",
        "phone_number": 254712345602,
        "location": "Kilimani",
        "username": "marywanjiku",
        "password": "Password123!"
    },
    {
        "full_name": "David Mwangi",
        "email": "david.mwangi@example.com",
        "phone_number": 254712345603,
        "location": "Lavington",
        "username": "davidmwangi",
        "password": "Password123!"
    },
    {
        "full_name": "Grace Njeri",
        "email": "grace.njeri@example.com",
        "phone_number": 254712345604,
        "location": "Kileleshwa",
        "username": "gracenjeri",
        "password": "Password123!"
    },
    {
        "full_name": "Peter Otieno",
        "email": "peter.otieno@example.com",
        "phone_number": 254712345605,
        "location": "Parklands",
        "username": "peterotieno",
        "password": "Password123!"
    },
    {
        "full_name": "Anne Akinyi",
        "email": "anne.akinyi@example.com",
        "phone_number": 254712345606,
        "location": "Karen",
        "username": "anneakinyi",
        "password": "Password123!"
    },
    {
        "full_name": "Samuel Kiptoo",
        "email": "samuel.kiptoo@example.com",
        "phone_number": 254712345607,
        "location": "Riverside",
        "username": "samuelkiptoo",
        "password": "Password123!"
    },
    {
        "full_name": "Lucy Wambui",
        "email": "lucy.wambui@example.com",
        "phone_number": 254712345608,
        "location": "Hurlingham",
        "username": "lucywambui",
        "password": "Password123!"
    },
    {
        "full_name": "Brian Ochieng",
        "email": "brian.ochieng@example.com",
        "phone_number": 254712345609,
        "location": "Loresho",
        "username": "brianochieng",
        "password": "Password123!"
    },
    {
        "full_name": "Faith Chebet",
        "email": "faith.chebet@example.com",
        "phone_number": 254712345610,
        "location": "Kasarani",
        "username": "faithchebet",
        "password": "Password123!"
    },
    {
        "full_name": "Kevin Maina",
        "email": "kevin.maina@example.com",
        "phone_number": 254712345611,
        "location": "Ngong Road",
        "username": "kevinmaina",
        "password": "Password123!"
    },
    {
        "full_name": "Cynthia Atieno",
        "email": "cynthia.atieno@example.com",
        "phone_number": 254712345612,
        "location": "South C",
        "username": "cynthiaatieno",
        "password": "Password123!"
    }
]


# ============================================================
# APARTMENTS
# ============================================================

apartments_data = [
    {
        "name": "Westlands Heights",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 245,
        "description": "Modern two-bedroom apartment in a secure and convenient location close to malls, restaurants and offices.",
        "location": "Westlands",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
        ]
    },
    {
        "name": "Kilimani Gardens",
        "type": "Mixed",
        "isVerified": True,
        "total_views": 189,
        "description": "Modern residential apartment offering different unit configurations suitable for students, professionals and small families.",
        "location": "Kilimani",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Lavington Court",
        "type": "3 Bedroom",
        "isVerified": True,
        "total_views": 321,
        "description": "Spacious three-bedroom apartment situated in a quiet residential neighborhood with excellent amenities.",
        "location": "Lavington",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
        ]
    },
    {
        "name": "Kileleshwa Residency",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 156,
        "description": "Well-designed two-bedroom apartment with spacious living areas and modern kitchen.",
        "location": "Kileleshwa",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Parklands Executive",
        "type": "Mixed",
        "isVerified": False,
        "total_views": 98,
        "description": "Comfortable residential apartment offering a mixture of unit types for professionals and families.",
        "location": "Parklands",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Karen Greenview",
        "type": "4 Bedroom",
        "isVerified": True,
        "total_views": 412,
        "description": "Large four-bedroom apartment surrounded by greenery and located in a peaceful residential area.",
        "location": "Karen",
        "imageURLS": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
        ]
    },
    {
        "name": "Riverside Apartments",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 267,
        "description": "Contemporary two-bedroom apartment offering easy access to Riverside Drive and Westlands.",
        "location": "Riverside",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Hurlingham Square",
        "type": "1 Bedroom",
        "isVerified": False,
        "total_views": 73,
        "description": "Affordable one-bedroom apartment in a quiet and accessible neighborhood.",
        "location": "Hurlingham",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
        ]
    },
    {
        "name": "Loresho View",
        "type": "Mixed",
        "isVerified": True,
        "total_views": 204,
        "description": "Residential apartment offering different unit configurations with modern interiors and secure parking.",
        "location": "Loresho",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
        ]
    },
    {
        "name": "Kangemi Modern Homes",
        "type": "2 Bedroom",
        "isVerified": False,
        "total_views": 61,
        "description": "Modern and affordable two-bedroom apartment suitable for small families and professionals.",
        "location": "Kangemi",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Ngong Road Suites",
        "type": "1 Bedroom",
        "isVerified": True,
        "total_views": 176,
        "description": "Stylish one-bedroom apartment located along Ngong Road with easy access to public transport.",
        "location": "Ngong Road",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Loresho Gardens",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 231,
        "description": "Beautiful two-bedroom apartment with spacious rooms and a peaceful environment.",
        "location": "Loresho",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
        ]
    },
    {
        "name": "South B Residency",
        "type": "Mixed",
        "isVerified": False,
        "total_views": 87,
        "description": "Affordable residential apartment offering different unit types near shopping centers and major transport routes.",
        "location": "South B",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
        ]
    },
    {
        "name": "South C Heights",
        "type": "3 Bedroom",
        "isVerified": True,
        "total_views": 293,
        "description": "Spacious three-bedroom apartment with modern amenities and secure parking.",
        "location": "South C",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Kasarani View",
        "type": "1 Bedroom",
        "isVerified": False,
        "total_views": 45,
        "description": "Simple and affordable one-bedroom apartment suitable for young professionals.",
        "location": "Kasarani",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
        ]
    },
    {
        "name": "Roysambu Heights",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 143,
        "description": "Modern two-bedroom apartment with excellent connectivity to Thika Road and nearby amenities.",
        "location": "Roysambu",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
        ]
    },
    {
        "name": "Muthaiga Residence",
        "type": "3 Bedroom",
        "isVerified": True,
        "total_views": 389,
        "description": "Premium three-bedroom apartment in an exclusive residential neighborhood.",
        "location": "Muthaiga",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    },
    {
        "name": "Garden Estate Homes",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 218,
        "description": "Quiet two-bedroom apartment with spacious living areas and reliable security.",
        "location": "Garden Estate",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        ]
    },
    {
        "name": "Kahawa West Apartments",
        "type": "Mixed",
        "isVerified": False,
        "total_views": 52,
        "description": "Affordable residential apartment offering different unit configurations with convenient access to shops and transport.",
        "location": "Kahawa West",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
        ]
    },
    {
        "name": "Donholm Court",
        "type": "2 Bedroom",
        "isVerified": True,
        "total_views": 129,
        "description": "Comfortable two-bedroom apartment in a family-friendly neighborhood.",
        "location": "Donholm",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
        ]
    },
    {
        "name": "Langata Heights",
        "type": "3 Bedroom",
        "isVerified": True,
        "total_views": 276,
        "description": "Spacious three-bedroom apartment close to shopping centers, schools and recreational facilities.",
        "location": "Langata",
        "imageURLs": [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
        ]
    }
]


# ============================================================
# UNITS
# ============================================================

def create_units_data(apartments):

    units_data = []

    mixed_categories = [
        {
            "category": "Single Room",
            "bedrooms": 1,
            "bathrooms": 1,
            "rent": 12000,
            "deposit": 12000,
            "size": 30,
            "maximum_occupants": 1
        },
        {
            "category": "Bedsitter",
            "bedrooms": 0,
            "bathrooms": 1,
            "rent": 10000,
            "deposit": 10000,
            "size": 25,
            "maximum_occupants": 1
        },
        {
            "category": "1 Bedroom",
            "bedrooms": 1,
            "bathrooms": 1,
            "rent": 18000,
            "deposit": 18000,
            "size": 45,
            "maximum_occupants": 2
        },
        {
            "category": "2 Bedroom",
            "bedrooms": 2,
            "bathrooms": 2,
            "rent": 28000,
            "deposit": 28000,
            "size": 70,
            "maximum_occupants": 4
        }
    ]

    for apartment_index, apartment in enumerate(apartments):

        # ----------------------------------------------------
        # Mixed apartments have different unit categories
        # ----------------------------------------------------

        if apartment["type"] == "Mixed":

            for unit_number, unit_type in enumerate(
                mixed_categories,
                start=1
            ):

                units_data.append({
                    "category": unit_type["category"],
                    "description": (
                        f"{unit_type['category']} unit available "
                        f"at {apartment['name']}."
                    ),
                    "status": "Vacant",
                    "rent": unit_type["rent"],
                    "deposit": unit_type["deposit"],
                    "bedrooms": unit_type["bedrooms"],
                    "bathrooms": unit_type["bathrooms"],
                    "size": unit_type["size"],
                    "shared": False,
                    "promoted": (
                        apartment_index % 5 == 0
                        and unit_number == 1
                    ),
                    "current_occupants": 0,
                    "maximum_occupants": unit_type[
                        "maximum_occupants"
                    ],
                    "imageURLS": apartment["imageURLs"],
                    "apartment_id": apartment["id"]
                })

        # ----------------------------------------------------
        # Non-mixed apartments
        # ----------------------------------------------------

        else:
            if apartment["type"] == "Bedsitter":
                bedrooms = 0
                bathrooms = 1
                rent = 10000
                deposit = 10000
                size = 25
                maximum_occupants = 1

            elif apartment["type"] == "1 Bedroom":
                bedrooms = 1
                bathrooms = 1
                rent = 18000
                deposit = 18000
                size = 45
                maximum_occupants = 2

            elif apartment["type"] == "2 Bedroom":
                bedrooms = 2
                bathrooms = 2
                rent = 28000
                deposit = 28000
                size = 70
                maximum_occupants = 4

            elif apartment["type"] == "3 Bedroom":
                bedrooms = 3
                bathrooms = 2
                rent = 40000
                deposit = 40000
                size = 100
                maximum_occupants = 5

            elif apartment["type"] == "4 Bedroom":
                bedrooms = 4
                bathrooms = 3
                rent = 55000
                deposit = 55000
                size = 140
                maximum_occupants = 7

            else:
                bedrooms = 1
                bathrooms = 1
                rent = 15000
                deposit = 15000
                size = 40
                maximum_occupants = 2

            # Create 3 units for this apartment
            for unit_number in range(1, 4):

                units_data.append({
                    "category": apartment["type"],
                    "description": (
                        f"{apartment['type']} unit {unit_number} "
                        f"at {apartment['name']}."
                    ),
                    "status": "Vacant",
                    "rent": rent,
                    "deposit": deposit,
                    "bedrooms": bedrooms,
                    "bathrooms": bathrooms,
                    "size": size,
                    "shared": False,
                    "promoted": (
                        apartment_index % 5 == 0
                        and unit_number == 1
                    ),
                    "current_occupants": 0,
                    "maximum_occupants": maximum_occupants,
                    "imageURLS": apartment["imageURLs"],
                    "apartment_id": apartment["id"]
                })

    return units_data




# ============================================================
# STUDENTS
# ============================================================

students_data = [
    {
        "full_name": "Brian Otieno",
        "email": "brian.otieno@student.com",
        "phone_number": 254701234501,
        "dob": "2002-04-15",
        "institution": "University of Nairobi",
        "course": "Computer Science",
        "year_of_study": 4,
        "student_number": 20210001,
        "graduation_year": 2026,
        "location": "Nairobi",
        "username": "brianotieno",
        "password": "Password123!"
    },
    {
        "full_name": "Faith Wanjiku",
        "email": "faith.wanjiku@student.com",
        "phone_number": 254701234502,
        "dob": "2003-08-22",
        "institution": "Kenyatta University",
        "course": "Information Technology",
        "year_of_study": 3,
        "student_number": 20220002,
        "graduation_year": 2027,
        "location": "Nairobi",
        "username": "faithwanjiku",
        "password": "Password123!"
    },
    {
        "full_name": "Kevin Mwangi",
        "email": "kevin.mwangi@student.com",
        "phone_number": 254701234503,
        "dob": "2001-11-10",
        "institution": "Strathmore University",
        "course": "Business Administration",
        "year_of_study": 4,
        "student_number": 20210003,
        "graduation_year": 2026,
        "location": "Nairobi",
        "username": "kevinmwangi",
        "password": "Password123!"
    },
    {
        "full_name": "Sharon Njeri",
        "email": "sharon.njeri@student.com",
        "phone_number": 254701234504,
        "dob": "2004-02-18",
        "institution": "Jomo Kenyatta University",
        "course": "Software Engineering",
        "year_of_study": 2,
        "student_number": 20230004,
        "graduation_year": 2028,
        "location": "Juja",
        "username": "sharonnjeri",
        "password": "Password123!"
    },
    {
        "full_name": "Daniel Kiptoo",
        "email": "daniel.kiptoo@student.com",
        "phone_number": 254701234505,
        "dob": "2002-07-03",
        "institution": "Moi University",
        "course": "Computer Science",
        "year_of_study": 4,
        "student_number": 20210005,
        "graduation_year": 2026,
        "location": "Eldoret",
        "username": "danielkiptoo",
        "password": "Password123!"
    },
    {
        "full_name": "Mercy Akinyi",
        "email": "mercy.akinyi@student.com",
        "phone_number": 254701234506,
        "dob": "2003-05-27",
        "institution": "University of Nairobi",
        "course": "Economics",
        "year_of_study": 3,
        "student_number": 20220006,
        "graduation_year": 2027,
        "location": "Kisumu",
        "username": "mercyakinyi",
        "password": "Password123!"
    },
    {
        "full_name": "Samuel Kamau",
        "email": "samuel.kamau@student.com",
        "phone_number": 254701234507,
        "dob": "2004-01-12",
        "institution": "Kenyatta University",
        "course": "Information Science",
        "year_of_study": 2,
        "student_number": 20230007,
        "graduation_year": 2028,
        "location": "Nairobi",
        "username": "samuelkamau",
        "password": "Password123!"
    },
    {
        "full_name": "Lucy Chebet",
        "email": "lucy.chebet@student.com",
        "phone_number": 254701234508,
        "dob": "2002-09-30",
        "institution": "Egerton University",
        "course": "Agribusiness",
        "year_of_study": 4,
        "student_number": 20210008,
        "graduation_year": 2026,
        "location": "Nakuru",
        "username": "lucychebet",
        "password": "Password123!"
    },
    {
        "full_name": "Michael Ochieng",
        "email": "michael.ochieng@student.com",
        "phone_number": 254701234509,
        "dob": "2003-03-14",
        "institution": "Maseno University",
        "course": "Information Technology",
        "year_of_study": 3,
        "student_number": 20220009,
        "graduation_year": 2027,
        "location": "Kisumu",
        "username": "michaelchieng",
        "password": "Password123!"
    },
    {
        "full_name": "Ann Wambui",
        "email": "ann.wambui@student.com",
        "phone_number": 254701234510,
        "dob": "2004-06-08",
        "institution": "Mount Kenya University",
        "course": "Computer Science",
        "year_of_study": 2,
        "student_number": 20230010,
        "graduation_year": 2028,
        "location": "Thika",
        "username": "annwambui",
        "password": "Password123!"
    },
    {
        "full_name": "George Maina",
        "email": "george.maina@student.com",
        "phone_number": 254701234511,
        "dob": "2001-12-21",
        "institution": "Strathmore University",
        "course": "Finance",
        "year_of_study": 4,
        "student_number": 20210011,
        "graduation_year": 2026,
        "location": "Nairobi",
        "username": "georgemaina",
        "password": "Password123!"
    },
    {
        "full_name": "Cynthia Atieno",
        "email": "cynthia.atieno@student.com",
        "phone_number": 254701234512,
        "dob": "2003-10-05",
        "institution": "Technical University",
        "course": "Business IT",
        "year_of_study": 3,
        "student_number": 20220012,
        "graduation_year": 2027,
        "location": "Nairobi",
        "username": "cynthiaatieno",
        "password": "Password123!"
    }
]


# ============================================================
# UNIT AMENITIES
# ============================================================

unit_amenities_data = [
    {
        "name": "Kitchen",
        "description": "A functional kitchen area for preparing and cooking meals.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
    },
    {
        "name": "Wardrobes",
        "description": "Built-in or fitted storage wardrobes for clothes and personal belongings.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
    },
    {
        "name": "Balcony",
        "description": "A private outdoor balcony providing additional space and ventilation.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/2555/2555013.png"
    },
    {
        "name": "Sink",
        "description": "A fixed sink for washing dishes, utensils, and other household items.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/2738/2738152.png"
    }
]


# ============================================================
# APARTMENT AMENITIES
# ============================================================

apartment_amenities_data = [
    {
        "name": "Furnished",
        "description": "The apartment comes fully furnished with essential furniture and fittings.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
    },
    {
        "name": "WiFi Available",
        "description": "Reliable WiFi internet connectivity is available throughout the apartment.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/93/93158.png"
    },
    {
        "name": "Water Reliable",
        "description": "The apartment has a reliable and consistent water supply.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/3105/3105807.png"
    },
    {
        "name": "Security Guard",
        "description": "Trained security personnel are available to provide security for residents.",
        "iconUrl": "https://cdn-icons-png.flaticon.com/512/3067/3067452.png"
    }
]


# ============================================================
# NEARBY FACILITIES
# ============================================================

facility_types = [
    {
        "category": "school",
        "titles": [
            "Nearby Primary School",
            "Nearby Secondary School",
            "Nearby International School",
            "Nearby University"
        ],
        "distances": [
            "0.8 km",
            "1.2 km",
            "1.5 km",
            "2.0 km"
        ]
    },
    {
        "category": "mall",
        "titles": [
            "Nearby Shopping Mall",
            "Nearby City Mall",
            "Nearby Plaza",
            "Nearby Shopping Centre"
        ],
        "distances": [
            "1.0 km",
            "1.4 km",
            "1.8 km",
            "2.3 km"
        ]
    },
    {
        "category": "hospital",
        "titles": [
            "Nearby Medical Centre",
            "Nearby Hospital",
            "Nearby Health Centre",
            "Nearby Clinic"
        ],
        "distances": [
            "0.7 km",
            "1.3 km",
            "1.6 km",
            "2.1 km"
        ]
    },
    {
        "category": "gym",
        "titles": [
            "Nearby Fitness Centre",
            "Nearby Gym",
            "Nearby Fitness Club",
            "Nearby Health Club"
        ],
        "distances": [
            "0.5 km",
            "0.9 km",
            "1.4 km",
            "1.9 km"
        ]
    }
]




# ============================================================
# SEED DATABASE
# ============================================================

def seed_database():
    with app.app_context():

        # Deleting the existing records first to avoid duplication of data when the seed file is executed each time

        UnitAmenityJoining.query.delete( synchronize_session=False )
        NearbyFacility.query.delete( synchronize_session=False )
        Unit.query.delete( synchronize_session=False )
        Apartment.query.delete( synchronize_session=False )
        ApartmentOwner.query.delete( synchronize_session=False )
        Student.query.delete( synchronize_session=False )
        UnitAmenity.query.delete( synchronize_session=False )
        ApartmentAmenity.query.delete( synchronize_session=False )
        db.session.commit()

        # ----------------------------------------------------
        # Seed students
        # ----------------------------------------------------

        students = []

        for data in students_data:

            student = Student(
                full_name=data["full_name"],
                email=data["email"],
                phone_number=data["phone_number"],
                dob=datetime.strptime(
                    data["dob"],
                    "%Y-%m-%d"
                ),
                institution=data["institution"],
                course=data["course"],
                year_of_study=data["year_of_study"],
                student_number=data["student_number"],
                graduation_year=data["graduation_year"],
                location=data["location"],
                username=data["username"],
                _password_hash=generate_password_hash(
                    data["password"]
                )
            )

            db.session.add(student)
            students.append(student)

        db.session.flush()

        print(
            f"Created {len(students)} students."
        )

        
        # ----------------------------------------------------
        # Seed 4 unit amenities
        # ----------------------------------------------------

        unit_amenities = []

        for data in unit_amenities_data:

            unit_amenity = UnitAmenity(
                name=data["name"],
                description=data["description"],
                iconUrl=data["iconUrl"]
            )

            db.session.add(unit_amenity)
            unit_amenities.append(unit_amenity)

        db.session.flush()

        print(
            f"Created {len(unit_amenities)} unit amenities."
        )

        
        # ----------------------------------------------------
        # Seed 4 apartment amenities
        # ----------------------------------------------------

        apartment_amenities = []

        for data in apartment_amenities_data:

            apartment_amenity = ApartmentAmenity(
                name=data["name"],
                description=data["description"],
                iconUrl=data["iconUrl"]
            )

            db.session.add(apartment_amenity)
            apartment_amenities.append(apartment_amenity)

        db.session.flush()

        print(
            f"Created {len(apartment_amenities)} apartment amenities."
        )


        # ----------------------------------------------------
        # Seed apartment owners
        # ----------------------------------------------------

        owners = []

        for data in owners_data:

            # Avoid duplicate owners when running seed.py
            owner = ApartmentOwner.query.filter_by(
                email=data["email"]
            ).first()

            if owner:
                owners.append(owner)
                continue

            owner = ApartmentOwner(
                full_name=data["full_name"],
                email=data["email"],
                phone_number=data["phone_number"],
                location=data["location"],
                username=data["username"],
                _password_hash=generate_password_hash(
                    data["password"]
                )
            )

            db.session.add(owner)
            owners.append(owner)

        # Flush so newly-created owners receive their IDs
        db.session.flush()

        print(f"Created {len(owners)} apartment owners")

        # ----------------------------------------------------
        # Seed apartments
        # ----------------------------------------------------

        apartments = []

        for index, data in enumerate(apartments_data):

            # Avoid duplicate apartments based on name
            existing = Apartment.query.filter_by(
                name=data["name"]
            ).first()

            if existing:
                continue

            # Rotate through the 12 owners when assigning an apartment to an owner
            owner = owners[index % len(owners)]

            apartment = Apartment(
                name=data["name"],
                type=data["type"],
                isVerified=data["isVerified"],
                total_views=data["total_views"],
                description=data["description"],
                location=data["location"],
                imageURLs=data["imageURLs"],
                owner_id=owner.id
            )

            db.session.add(apartment)
            apartments.append(apartment)

        db.session.flush()

        apartments.append(apartment)
        print(
            f"Created {len(apartments)} apartments."
        )

        # ----------------------------------------------------
        # Seed units
        # ----------------------------------------------------

        units_data = create_units_data([
            {
                "id": apartment.id,
                "name": apartment.name,
                "type": apartment.type,
                "imageURLs": apartment.imageURLs
            }
            for apartment in apartments
        ])

        units = []

        for data in units_data:

            unit = Unit(
                category=data["category"],
                description=data["description"],
                status=data["status"],
                rent=data["rent"],
                deposit=data["deposit"],
                bedrooms=data["bedrooms"],
                bathrooms=data["bathrooms"],
                size=data["size"],
                shared=data["shared"],
                promoted=data["promoted"],
                current_occupants=data["current_occupants"],
                maximum_occupants=data["maximum_occupants"],
                imageURLS=data["imageURLS"],
                apartment_id=data["apartment_id"]
            )

            db.session.add(unit)
            units.append(unit)

        db.session.flush()

        print(
            f"Created {len(units)} units."
        )


        # ----------------------------------------------------
        # Seed nearby facilities
        # ----------------------------------------------------

        nearby_facilities = []

        for apartment_index, apartment in enumerate(apartments):

            # ------------------------------------------------
            # Create one school
            # ------------------------------------------------

            school = NearbyFacility(
                title=facility_types[0]["titles"][
                    apartment_index % len(
                        facility_types[0]["titles"]
                    )
                ],
                distance=facility_types[0]["distances"][
                    apartment_index % len(
                        facility_types[0]["distances"]
                    )
                ],
                apartmentId=apartment.id
            )

            nearby_facilities.append(school)

            # ------------------------------------------------
            # Create one mall
            # ------------------------------------------------

            mall = NearbyFacility(
                title=facility_types[1]["titles"][
                    apartment_index % len(
                        facility_types[1]["titles"]
                    )
                ],
                distance=facility_types[1]["distances"][
                    apartment_index % len(
                        facility_types[1]["distances"]
                    )
                ],
                apartmentId=apartment.id
            )

            nearby_facilities.append(mall)

            # ------------------------------------------------
            # Create one hospital
            # ------------------------------------------------

            hospital = NearbyFacility(
                title=facility_types[2]["titles"][
                    apartment_index % len(
                        facility_types[2]["titles"]
                    )
                ],
                distance=facility_types[2]["distances"][
                    apartment_index % len(
                        facility_types[2]["distances"]
                    )
                ],
                apartmentId=apartment.id
            )

            nearby_facilities.append(hospital)

            # ------------------------------------------------
            # Create one gym
            # ------------------------------------------------

            gym = NearbyFacility(
                title=facility_types[3]["titles"][
                    apartment_index % len(
                        facility_types[3]["titles"]
                    )
                ],
                distance=facility_types[3]["distances"][
                    apartment_index % len(
                        facility_types[3]["distances"]
                    )
                ],
                apartmentId=apartment.id
            )

            nearby_facilities.append(gym)


        db.session.add_all(nearby_facilities)

        db.session.flush()

        print(
            f"Created {len(nearby_facilities)} nearby facilities."
        )

        
        # ----------------------------------------------------
        # Seed unit-amenity relationships
        # ----------------------------------------------------

        unit_amenity_links = []

        # Each unit gets at least two amenities.

        for unit_index, unit in enumerate(units):

            # First amenity
            first_amenity = amenities[
                unit_index % len(amenities)
            ]

            # Second amenity
            second_amenity = amenities[
                (unit_index + 1) % len(amenities)
            ]

            # Create first relationship
            unit_amenity_links.append(
                UnitAmenityJoining(
                    unitId=unit.id,
                    amenityId=first_amenity.id
                )
            )

            # Create second relationship
            unit_amenity_links.append(
                UnitAmenityJoining(
                    unitId=unit.id,
                    amenityId=second_amenity.id
                )
            )


        db.session.add_all(unit_amenity_links)

        db.session.flush()

        print(
            f"Created {len(unit_amenity_links)} "
            f"unit-amenity relationships."
        )




        # ----------------------------------------------------
        # Commit everything
        # ----------------------------------------------------

        db.session.commit()

        print(
            f"Successfully seeded the database."
        )


if __name__ == "__main__":
    seed_database()
