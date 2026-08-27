from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import ValidationError, fields, validate, validates_schema, Schema
from marshmallow_sqlalchemy.fields import Nested

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


    units = Nested('UnitSchema', many=True)

class UnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Unit
        load_instance = True
        include_fk = True

    student_units = Nested('StudentUnitSchema', many=True, exclude=('unit',))
    unit_links = Nested('UnitAmenityJoiningSchema', many=True, exclude=('unit',))

class UnitAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenity
        load_instance = True
        include_fk = True

    unit_links = Nested('UnitAmenityJoiningSchema', many=True, exclude=('amenity',))

class UnitAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenityJoining
        load_instance = True
        include_fk = True

    amenity = fields.Nested(UnitAmenitySchema, exclude=("unit_links",))
    unit = fields.Nested('UnitSchema',exclude=('unit_links',))


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
    apartment = fields.Nested('ApartmentSchema', exclude=('apartment_links',))


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
    dob = fields.DateTime(required=False)
    institution = fields.Str(required=False)
    course = fields.Str(required=False)
    year_of_study = fields.DateTime(required=False)
    student_number = fields.Int(required=False)
    graduation_year = fields.Int(required=False)
    location = fields.Str(required=False)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(
        required=True,
        load_only=True,
        attribute="password_hash",
        validate=validate.Length(min=1),
    )

    student_units = Nested('StudentUnitSchema',many=True, exclude=('student',))


class ApartmentOwnerSchema(Schema):
    id = fields.Int(dump_only=True)
    fullname = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Length(min=1))
    phone_number = fields.Str(required=True, validate=validate.Length(min=1))
    location = fields.Str(required=False)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(
        required=True,
        load_only=True,
        attribute="password_hash",
        validate=validate.Length(min=1),
    )

    apartments = Nested('ApartmentSchema', many=True)
