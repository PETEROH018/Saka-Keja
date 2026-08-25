from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime,timezone

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class Apartment(db.Model):
    __tablename__ = 'apartments'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(40), nullable = False)
    type = db.Column(db.String(40), nullable = False)
    isVerified = db.Column(db.Boolean, default=False, nullable = False)
    total_views = db.Column(db.Integer, default=0, nullable=False)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(80), nullable=False)
    imageURLs = db.Column(db.JSON, default=list,nullable=False)
    owner_id = db.Column(db.Integer,db.ForeignKey('apartment_owners.id'),nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

class Unit(db.Model):
    __tablename__ = 'units'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False) 
    description = db.Column(db.Text, nullable=False)       
    status = db.Column(db.String(30), default='Vacant', nullable=False) 
    rent = db.Column(db.Integer, nullable=False)
    deposit = db.Column(db.Integer, default=0, nullable=False)
    bedrooms = db.Column(db.Integer, default=0, nullable=False)
    bathrooms = db.Column(db.Integer, default=0, nullable=False)
    size = db.Column(db.Integer, nullable=True)         
    shared = db.Column(db.Boolean, default=False, nullable=False)
    current_occupants = db.Column(db.Integer, default=0, nullable=False)
    maximum_occupants = db.Column(db.Integer, default=1, nullable=False)
    imageURLS = db.Column(db.JSON, default=list, nullable=False)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartments.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

