from configs import *

from sqlalchemy.orm import relationship
class UnitAmenity(db.Model):
    __tablename__ = "unit_amenities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(255))
    iconUrl = db.Column(db.String(255))

    # Relationship to the join table
    unit_links = db.relationship(
        "UnitAmenityJoining",
        back_populates="amenity",
        cascade="all, delete-orphan",
    )