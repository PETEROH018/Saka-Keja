from models.StudentUnit import StudentUnit
from models.Payment import Payment
from models.UnitAmenityJoining import UnitAmenityJoining
from models.UnitAmenity import UnitAmenity
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from configs import db
from models.Student import Student
from models.Unit import Unit
from models.Apartment import Apartment
from models.ApartmentAmenity import ApartmentAmenity
from models.ApartmentAmenityJoining import ApartmentAmenityJoining
from models.ApartmentOwner import ApartmentOwner
from models.NearbyFacility import NearbyFacility

class StudentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Student
        sqla_session = db.session
        load_instance = True

class UnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Unit
        sqla_session = db.session
        load_instance = True

class ApartmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Apartment
        sqla_session = db.session
        load_instance = True

class ApartmentAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentAmenity
        sqla_session = db.session
        load_instance = True

class ApartmentAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentAmenityJoining
        sqla_session = db.session
        load_instance = True

class ApartmentOwnerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentOwner
        sqla_session = db.session
        load_instance = True

class NearbyFacilitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = NearbyFacility
        sqla_session = db.session
        load_instance = True

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
unit_schema = UnitSchema()
units_schema = UnitSchema(many=True)
apartment_schema = ApartmentSchema()
apartments_schema = ApartmentSchema(many=True)
apartment_amenity_schema = ApartmentAmenitySchema()
apartment_amenities_schema = ApartmentAmenitySchema(many=True)
apartment_amenity_joining_schema = ApartmentAmenityJoiningSchema()
apartment_amenity_joinings_schema = ApartmentAmenityJoiningSchema(many=True)
apartment_owner_schema = ApartmentOwnerSchema()
apartment_owners_schema = ApartmentOwnerSchema(many=True)
nearby_facility_schema = NearbyFacilitySchema()
nearby_facilities_schema = NearbyFacilitySchema(many=True)

class UnitAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenity
        sqla_session = db.session
        load_instance = True

unit_amenity_schema = UnitAmenitySchema()
unit_amenities_schema = UnitAmenitySchema(many=True)

class UnitAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenityJoining
        sqla_session = db.session
        load_instance = True

unit_amenity_joining_schema = UnitAmenityJoiningSchema()
unit_amenity_joinings_schema = UnitAmenityJoiningSchema(many=True)

class StudentUnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = StudentUnit
        sqla_session = db.session
        load_instance = True

student_unit_schema = StudentUnitSchema()
student_units_schema = StudentUnitSchema(many=True)

class PaymentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Payment
        sqla_session = db.session
        load_instance = True

payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)
from models.StudentUnit import StudentUnit
from models.Payment import Payment

class StudentUnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = StudentUnit
        sqla_session = db.session
        load_instance = True

class PaymentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Payment
        sqla_session = db.session
        load_instance = True

student_unit_schema = StudentUnitSchema()
student_units_schema = StudentUnitSchema(many=True)
payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)
