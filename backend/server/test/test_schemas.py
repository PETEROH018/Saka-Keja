import pytest
from app import app
from models import db
from models.Unit import Unit
from models.UnitAmenity import UnitAmenity
from models.Apartment import Apartment
from models.ApartmentOwner import ApartmentOwner
from schema import UnitSchema, UnitAmenitySchema, StudentSchema


@pytest.fixture
def client():
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"

    with app.app_context():
        db.create_all()

        yield app.test_client()

        db.session.remove()
        db.drop_all()


def test_unit_amenity_schema_serializes(client):
    amenity = UnitAmenity(name="WiFi", description="Fast internet", iconUrl="wifi")
    db.session.add(amenity)
    db.session.commit()

    result = UnitAmenitySchema().dump(amenity)
    assert result["name"] == "WiFi"
    assert "id" in result


def test_unit_schema_serializes(client):
    owner = ApartmentOwner(
        full_name="Test Owner",
        email="owner@test.com",
        phone_number=700000000,
        username="testowner"
    )

    owner.password_hash = "password123"


    db.session.add(owner)
    db.session.commit()

    apartment = Apartment(
        name="Test Apartment",
        type="Apartment",
        description="A test apartment",
        location="Ruiru",
        owner_id=owner.id
    )

    db.session.add(apartment)
    db.session.commit()

    unit = Unit(
        category="bedsitter",
        description="A test bedsitter",
        rent=8000,
        bedrooms=0,
        bathrooms=1,
        apartment_id=apartment.id
    )

    db.session.add(unit)
    db.session.commit()

    result = UnitSchema().dump(unit)

    assert result["category"] == "bedsitter"
    assert result["rent"] == 8000

def test_student_schema_requires_fullname():
    schema = StudentSchema()
    errors = schema.validate({
        "email": "test@example.com",
        "phone_number": "0700000000",
        "username": "testuser",
        "password": "secret123",
    })
    assert "fullname" in errors