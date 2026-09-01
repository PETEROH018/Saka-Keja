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
    apartment_amenity_links = fields.Nested("ApartmentAmenityJoiningSchema", many=True, exclude=("apartment",))
    nearby_facilities = Nested('NearbyFacilitySchema', many=True)


class UnitSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Unit
        load_instance = True
        include_fk = True

<<<<<<< Updated upstream
    # Expressly define nested apartment with reciprocal fields excluded
    apartment = fields.Nested('ApartmentSchema', exclude=('units', 'apartment_amenity_links', 'nearby_facilities'))
    student_units = fields.Nested('StudentUnitSchema', many=True, exclude=('unit',))
    unit_amenity_links = fields.Nested('UnitAmenityJoiningSchema', many=True, exclude=('unit',))
=======
    student_units = Nested('StudentUnitSchema', many=True, exclude=('unit',))
    unit_amenity_links = Nested('UnitAmenityJoiningSchema', many=True, exclude=('unit',))


>>>>>>> Stashed changes
class UnitAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenity
        load_instance = True
        include_fk = True

    unit_amenity_links = Nested('UnitAmenityJoiningSchema', many=True, exclude=('amenity',))


class UnitAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = UnitAmenityJoining
        load_instance = True
        include_fk = True

    amenity = fields.Nested(UnitAmenitySchema, exclude=("unit_amenity_links",))
    unit = fields.Nested('UnitSchema', exclude=('unit_amenity_links',))


class ApartmentAmenitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentAmenity
        load_instance = True
        include_fk = True

    apartment_amenity_links = fields.Nested("ApartmentAmenityJoiningSchema", many=True, exclude=("amenity",))


class ApartmentAmenityJoiningSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ApartmentAmenityJoining
        load_instance = True
        include_fk = True

    amenity = fields.Nested(ApartmentAmenitySchema, exclude=("apartment_amenity_links",))
    apartment = fields.Nested('ApartmentSchema', exclude=('apartment_amenity_links',))


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
    payments = Nested('PaymentSchema', many=True)


class StudentSchema(Schema):
    id = fields.Int(dump_only=True)
    full_name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Length(min=1))
    phone_number = fields.Str(required=True, validate=validate.Length(min=1))
    dob = fields.DateTime(required=False, allow_none=True)
    institution = fields.Str(required=False, allow_none=True)
    course = fields.Str(required=False, allow_none=True)
    year_of_study = fields.Str(required=False, allow_none=True)
    student_number = fields.Str(required=False, allow_none=True)
    graduation_year = fields.Str(required=False, allow_none=True)
    location = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(
        required=True,
        load_only=True,
        attribute="password_hash",
        validate=validate.Length(min=1),
    )

    student_units = Nested('StudentUnitSchema', many=True, exclude=('student',))


class ApartmentOwnerSchema(Schema):
    id = fields.Int(dump_only=True)
    full_name = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Length(min=1))
    phone_number = fields.Str(required=True, validate=validate.Length(min=1))
    location = fields.Str(required=False, allow_none=True)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(
        required=True,
        load_only=True,
        attribute="password_hash",
        validate=validate.Length(min=1),
    )

    apartments = Nested('ApartmentSchema', many=True)