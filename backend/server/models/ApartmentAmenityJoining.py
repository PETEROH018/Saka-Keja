from configs import *

class ApartmentAmenityJoining(db.Model):
    __tablename__ = "apartment_amenities_joining"

    id = db.Column(db.Integer, primary_key=True)
    apartmentId = db.Column(db.Integer, db.ForeignKey("apartments.id"), nullable=False)
    amenityId = db.Column(db.Integer, db.ForeignKey("apartment_amenities.id"), nullable=False)

    amenity = db.relationship("ApartmentAmenity", back_populates="apartment_links")