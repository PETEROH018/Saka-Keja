from configs import *

from sqlalchemy.orm import relationship
class ApartmentAmenity(db.Model):
    __tablename__ = "apartment_amenities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    iconUrl = db.Column(db.String(255))

    # Relationship to the join table
    apartment_links = db.relationship(
        "ApartmentAmenityJoining",
        back_populates="amenity",
        cascade="all, delete-orphan",
    )