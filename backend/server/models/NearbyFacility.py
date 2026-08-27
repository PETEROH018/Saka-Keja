from configs import *

from sqlalchemy.orm import relationship
class NearbyFacility(db.Model):
    __tablename__ = "nearby_facilities"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    distance = db.Column(db.String(80), nullable=False)
    apartmentId = db.Column(db.Integer, db.ForeignKey('apartments.id'), nullable=False)

    # Relationship back to Apartment
    apartment = db.relationship("Apartment", back_populates="nearby_facilities")