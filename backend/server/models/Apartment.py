from configs import *

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
    
    units = db.relationship('Unit',backref='apartment',cascade='all, delete-orphan') 
    nearby_facilities = db.relationship('NearbyFacility', backpopulates='apartment', cascade='all, delete-orphan')