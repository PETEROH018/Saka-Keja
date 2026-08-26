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
