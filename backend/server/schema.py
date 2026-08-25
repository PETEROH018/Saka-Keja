from marshmallow import ValidationError, fields, validate, validates_schema, Schema

#===========
#STUDENT SCHEMA
#===========
class StudentSchema(Schema):
    id = fields.Int(dump_only=True)
    fullname = fields.Str(required=True)
    email = fields.Str(required=True)
    phone_number = fields.Str(required=True)
    dob = fields.DateTime(required=False)
    institution= fields.Str(required=False)
    course = fields.Str(required=False)
    year_of_study = fields.DateTime(required=False)
    student_number = fields.Int(required=False)
    graduation_year = fields.Int(required=False)
    location = fields.Str(required=False)
    username = fields.Str(required=True)
    password = fields.Str(
        required=True,
        load_only=True,
        attribute='password_hash',
        validate=validate.Length(min=1),
    )

