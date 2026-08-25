from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


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

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "iconUrl": self.iconUrl,
        }


class UnitAmenityJoining(db.Model):
    __tablename__ = "unit_amenities_joining"

    id = db.Column(db.Integer, primary_key=True)
    unitId = db.Column(db.Integer, db.ForeignKey("units.id"), nullable=False)
    amenityId = db.Column(db.Integer, db.ForeignKey("unit_amenities.id"), nullable=False)

    amenity = db.relationship("UnitAmenity", back_populates="unit_links")

    def to_dict(self):
        return {
            "id": self.id,
            "unitId": self.unitId,
            "amenityId": self.amenityId,
            "amenity": self.amenity.to_dict() if self.amenity else None,
        }



class Unit(db.Model):
    __tablename__ = "units"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(80))

    amenity_links = db.relationship(
        "UnitAmenityJoining",
        backref="unit",
        cascade="all, delete-orphan",
    )