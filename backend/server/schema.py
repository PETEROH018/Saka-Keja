from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

from models import *

class ApartmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Apartment
        load_instance = True  
        include_fk = True 