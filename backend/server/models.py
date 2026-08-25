from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, MetaData, VARCHAR, DateTime
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt


meta = MetaData()
Base = declarative_base(metadata=meta)
bcrypt = Bcrypt()

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

class Unit(db.Model):
    __tablename__ = "units"

    id = db.Column(db.Integer, primary_key=True)
    apartmentId = db.Column(db.String(20))  # matches the "id" string in db.json apartments
    name = db.Column(db.String(150))
    category = db.Column(db.String(80))

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
 
class ApartmentOwner(Base):
    __tablename__ = "apaerment_owners"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(VARCHAR(30), nullable=False, unique=True)
    phone_number = Column(Integer, nullable=False, unique=True)
    location = Column(String(20), nullable=True)
    username = Column(VARCHAR(30), unique=True)
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
