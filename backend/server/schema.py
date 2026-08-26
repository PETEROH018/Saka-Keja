from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields, validate, Schema

from models.Apartment import Apartment
from models.Unit import Unit
from models.UnitAmenity import UnitAmenity
from models.UnitAmenityJoining import UnitAmenityJoining
from models.ApartmentAmenity import ApartmentAmenity
from models.ApartmentAmenityJoining import ApartmentAmenityJoining
from models.NearbyFacility import NearbyFacility
from models.Payment import Payment
from models.StudentUnit import StudentUnit


class ApartmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Apartment
        load_instance = True
        include_fk = True


class UnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Unit
        load_instance = True
        include_fk = True


class UnitAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenity
        load_instance = True
        include_fk = True


class UnitAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenityJoining
        load_instance = True
        include_fk = True

    amenity = fields.Nested(UnitAmenitySchema, exclude=("unit_links",))


class ApartmentAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentAmenity
        load_instance = True
        include_fk = True

    apartment_links = fields.Nested(
        "ApartmentAmenityJoiningSchema", many=True, exclude=("amenity",)
    )


class ApartmentAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentAmenityJoining
        load_instance = True
        include_fk = True

    amenity = fields.Nested(ApartmentAmenitySchema, exclude=("apartment_links",))


class NearbyFacilitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = NearbyFacility
        load_instance = True
        include_fk = True


class PaymentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Payment
        load_instance = True
        include_fk = True


class StudentUnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = StudentUnit
        load_instance = True
        include_fk = True

    student = fields.Nested("StudentSchema", exclude=("student_units",))
    unit = fields.Nested(UnitSchema, exclude=("student_units",))


class StudentSchema(Schema):
    id = fields.Int(dump_only=True)
    fullname = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Length(min=1))
    phone_number = fields.Str(required=True, validate=validate.Length(min=1))
