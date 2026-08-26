from configs import *

class UnitAmenityJoining(db.Model):
    __tablename__ = "unit_amenities_joining"

    id = db.Column(db.Integer, primary_key=True)
    unitId = db.Column(db.Integer, db.ForeignKey("units.id"), nullable=False)
    amenityId = db.Column(db.Integer, db.ForeignKey("unit_amenities.id"), nullable=False)

    amenity = db.relationship("UnitAmenity", back_populates="unit_links")