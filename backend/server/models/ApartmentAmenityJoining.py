from configs import *


class ApartmentAmenityJoining(db.Model):
    __tablename__ = "apartment_amenities_joining"

    id = db.Column(db.Integer, primary_key=True)

    apartment_id = db.Column(
        db.Integer,
        db.ForeignKey("apartments.id"),
        nullable=False
    )

    amenity_id = db.Column(
        db.Integer,
        db.ForeignKey("apartment_amenities.id"),
        nullable=False
    )

    apartment = db.relationship(
        "Apartment",
        back_populates="amenity_links"
    )

    amenity = db.relationship(
        "ApartmentAmenity",
        back_populates="apartment_links"
    )