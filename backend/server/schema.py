from marshmallow import ValidationError, fields, validate, validates_schema, Schema

#===========
#STUDENT SCHEMA
#===========
class StudentSchema(Schema):
    id = fields.Int(dump_only=True)
    fullname = fields.Str(required=True)
    email = fields.Str(required=True)
    

