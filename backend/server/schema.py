from marshmallow import ValidationError, fields, validate, validates_schema, Schema

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

class StudentSchema(Schema):
    id = fields.Int(dump_only=True, validate=validate.Length(min=1))
    fullname = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Length(min=1))
    phone_number = fields.Str(required=True, validate=validate.Length(min=1))
    dob = fields.DateTime(required=False)
    institution= fields.Str(required=False)
    course = fields.Str(required=False)
    year_of_study = fields.DateTime(required=False)
    student_number = fields.Int(required=False)
    graduation_year = fields.Int(required=False)
    location = fields.Str(required=False)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(
        required=True,
        load_only=True,
        attribute='password_hash',
        validate=validate.Length(min=1),
    )

class StudentSchema(Schema):
    id = fields.Int(dump_only=True, validate=validate.Length(min=1))
    fullname = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Str(required=True, validate=validate.Length(min=1))
    phone_number = fields.Str(required=True, validate=validate.Length(min=1))
    location = fields.Str(required=False)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    password = fields.Str(
        required=True,
        load_only=True,
        attribute='password_hash',
        validate=validate.Length(min=1),
    )

