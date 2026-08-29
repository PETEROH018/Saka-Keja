from configs import *

from sqlalchemy.orm import relationship
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
    promoted = db.Column(db.Boolean, default=False, nullable=False)
    current_occupants = db.Column(db.Integer, default=0, nullable=False)
    maximum_occupants = db.Column(db.Integer, default=1, nullable=False)
    imageURLS = db.Column(db.JSON, default=list, nullable=False)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartments.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
    
    unit_amenity_links = db.relationship(
        "UnitAmenityJoining",
        backref="unit",
        cascade="all, delete-orphan",
    )
    
    student_units = relationship(
        "StudentUnit",
        back_populates="unit",
        cascade="all, delete-orphan"
    )

    apartment = relationship(
        "Apartment",
        back_populates="units"
    )