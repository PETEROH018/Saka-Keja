from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime,timezone
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, MetaData, VARCHAR, DateTime
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt

metadata = MetaData()
Base = declarative_base(metadata=meta)
bcrypt = Bcrypt()
db = SQLAlchemy(metadata=metadata)

class ApartmentOwner(Base):
    __tablename__ = "aparment_owners"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(VARCHAR(30), nullable=False, unique=True)
    phone_number = Column(Integer, nullable=False, unique=True)
    location = Column(String(20), nullable=True)
    username = Column(VARCHAR(30), unique=True)
    _password_hash = Column(String, nullable=False)
    
    apartments = db.Relationship('Apartment',backref='apartment_owner', cascade='all, delete-orphan')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Passwords may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

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
    
    units = db.Relationship('Unit',backref='apartment',cascade='all, delete-orphan') 
    
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

class UnitAmenityJoining(db.Model):
    __tablename__ = "unit_amenities_joining"

    id = db.Column(db.Integer, primary_key=True)
    unitId = db.Column(db.Integer, db.ForeignKey("units.id"), nullable=False)
    amenityId = db.Column(db.Integer, db.ForeignKey("unit_amenities.id"), nullable=False)

    amenity = db.relationship("UnitAmenity", back_populates="unit_links")
    
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
    
    amenity_links = db.relationship(
        "UnitAmenityJoining",
        backref="unit",
        cascade="all, delete-orphan",
    )
    
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(30), nullable=False, unique=True)
    phone_number = Column(Integer, nullable=False, unique=True)
    dob = Column(DateTime, nullable=True)
    institution = Column(String(20), nullable=True)
    course = Column(String(20), nullable=True)
    year_of_study=Column(Integer, nullable=True)
    student_number = Column(Integer, nullable=True)
    graduation_year = Column(Integer, nullable=True)
    location = Column(String(20), nullable=True)
    username = Column(String(30), unique=True)
    _password_hash = Column(String, nullable=False)

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Passwords may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
 

