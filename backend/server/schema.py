from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from models import *

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