from marshmallow import Schema, fields


class UnitAmenitySchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str(allow_none=True)
    iconUrl = fields.Str(allow_none=True)


class UnitAmenityJoiningSchema(Schema):
    id = fields.Int(dump_only=True)
    unitId = fields.Int(required=True)
    amenityId = fields.Int(required=True)
    amenity = fields.Nested(UnitAmenitySchema, dump_only=True)


unit_amenity_schema = UnitAmenitySchema()
unit_amenities_schema = UnitAmenitySchema(many=True)

unit_amenity_joining_schema = UnitAmenityJoiningSchema()
unit_amenities_joining_schema = UnitAmenityJoiningSchema(many=True)