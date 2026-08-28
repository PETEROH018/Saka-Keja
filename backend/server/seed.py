from app import app
from configs import db
from models.Apartment import Apartment
from models.Unit import Unit
from models.ApartmentOwner import ApartmentOwner
from models.Student import Student
from models.StudentUnit import StudentUnit
from datetime import date

def seed_database():
    with app.app_context():
        print("Clearing existing data...")
        db.drop_all()
        db.create_all()

        print("Seeding apartment owners...")
        owner1 = ApartmentOwner(full_name="Maina Kamau", email="maina@example.com", phone_number="0712345678")
        owner1.password_hash = "securepassword123"
        owner2 = ApartmentOwner(full_name="Amina Omondi", email="amina@example.com", phone_number="0723456789")
        owner2.password_hash = "securepassword123"
        db.session.add_all([owner1, owner2])
        db.session.commit()

        print("Seeding apartments...")
        apt1 = Apartment(name="Utawala Heights", type="Apartment", location="Utawala", description="Secure and modern student apartments near campus.", owner_id=owner1.id, total_views=12)
        apt2 = Apartment(name="Hostel Royal", type="Hostel", location="Juja", description="Affordable single rooms with reliable Wi-Fi and water.", owner_id=owner2.id, total_views=25)
        db.session.add_all([apt1, apt2])
        db.session.commit()

        print("Seeding units...")
        unit1 = Unit(apartment_id=apt1.id, category="A1", description="Spacious single bedroom unit", rent=15000, status="Vacant", bedrooms=1)
        unit2 = Unit(apartment_id=apt1.id, category="A2", description="Two bedroom family unit", rent=18000, status="Occupied", bedrooms=2)
        unit3 = Unit(apartment_id=apt2.id, category="B1", description="Standard student hostel room", rent=10000, status="Vacant", bedrooms=1)
        db.session.add_all([unit1, unit2, unit3])
        db.session.commit()

        print("Seeding students...")
        student1 = Student(full_name="Sonia Wangare", email="sonia@example.com", phone_number="0798765432", username="sonia_w", institution="Moringa School", course="Software Engineering", location="Nairobi")
        student1.password_hash = "securepassword123"
        db.session.add(student1)
        db.session.commit()

        print("Seeding student units (favorites/bookings)...")
        student_unit = StudentUnit(student_id=student1.id, unit_id=unit1.id, favorite=True, deposit_paid=5000, date_occupied=date.today())
        db.session.add(student_unit)
        db.session.commit()

        print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
