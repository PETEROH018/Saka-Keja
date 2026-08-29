from configs import *

from sqlalchemy.orm import relationship

class ApartmentOwner(db.Model):
    __tablename__ = "apartment_owners"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(30), nullable=False, unique=True)
    phone_number = db.Column(db.String(20), nullable=False, unique=True)
    location = db.Column(db.String(20), nullable=True)
    username = db.Column(db.String(30), unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    apartments = db.relationship(
        "Apartment",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode("utf-8")
        )
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash,
            password.encode("utf-8")
        )