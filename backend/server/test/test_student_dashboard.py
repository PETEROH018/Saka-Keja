import pytest

from app import app
from models import db
from models.Unit import Unit
from models.Apartment import Apartment
from models.ApartmentOwner import ApartmentOwner
from models.Unit import Unit
from models.Apartment import Apartment
from models.ApartmentOwner import ApartmentOwner
from models.Student import Student
from models.StudentUnit import StudentUnit


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()


def test_get_promoted_units_returns_only_promoted_units(client):
    owner = ApartmentOwner(
        full_name="Test Owner",
        email="promoted@test.com",
        phone_number=700000001,
        username="promotedowner",
    )
    owner.password_hash = "password123"

    db.session.add(owner)
    db.session.commit()

    apartment = Apartment(
        name="Test Apartment",
        type="Apartment",
        description="Test apartment",
        location="Ruiru",
        owner_id=owner.id,
    )

    db.session.add(apartment)
    db.session.commit()

    promoted_unit = Unit(
        category="bedsitter",
        description="Promoted unit",
        rent=8000,
        bedrooms=0,
        bathrooms=1,
        apartment_id=apartment.id,
        promoted=True,
    )

    normal_unit = Unit(
        category="bedsitter",
        description="Normal unit",
        rent=7000,
        bedrooms=0,
        bathrooms=1,
        apartment_id=apartment.id,
        promoted=False,
    )

    db.session.add_all([promoted_unit, normal_unit])
    db.session.commit()

    response = client.get("/units/promoted")

    assert response.status_code == 200

    data = response.get_json()

    assert data["total"] == 1
    assert len(data["items"]) == 1
    assert data["items"][0]["id"] == promoted_unit.id


def test_get_student_favorites_returns_only_favorited_units(client):
    student = Student(
        full_name="Test Student",
        email="student@test.com",
        phone_number=700000002,
        username="teststudent",
    )
    student.password_hash = "password123"

    db.session.add(student)
    db.session.commit()

    owner = ApartmentOwner(
        full_name="Test Owner",
        email="owner@test.com",
        phone_number=700000003,
        username="testowner",
    )
    owner.password_hash = "password123"

    db.session.add(owner)
    db.session.commit()

    apartment = Apartment(
        name="Student Test Apartment",
        type="Apartment",
        description="Test apartment",
        location="Ruiru",
        owner_id=owner.id,
    )

    db.session.add(apartment)
    db.session.commit()

    favorite_unit = Unit(
        category="bedsitter",
        description="Favorite unit",
        rent=8000,
        bedrooms=0,
        bathrooms=1,
        apartment_id=apartment.id,
        promoted=False,
    )

    normal_unit = Unit(
        category="bedsitter",
        description="Normal unit",
        rent=7000,
        bedrooms=0,
        bathrooms=1,
        apartment_id=apartment.id,
        promoted=False,
    )

    db.session.add_all([favorite_unit, normal_unit])
    db.session.commit()

    favorite_student_unit = StudentUnit(
        student_id=student.id,
        unit_id=favorite_unit.id,
        favorite=True,
    )

    normal_student_unit = StudentUnit(
        student_id=student.id,
        unit_id=normal_unit.id,
        favorite=False,
    )

    db.session.add_all([favorite_student_unit, normal_student_unit])
    db.session.commit()

    response = client.get(f"/students/{student.id}/favorites")

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 1
    assert data[0]["id"] == favorite_unit.id
