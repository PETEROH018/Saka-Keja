from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, MetaData, VARCHAR, DateTime
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt

meta = MetaData()
bcrypt = Bcrypt()
Base = declarative_base(metadata=meta)


#===================
#STUDENT MODEL
#===================
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(VARCHAR(30), nullable=False, unique=True)
    phone_number = Column(Integer, nullable=False, unique=True)
    dob = Column(DateTime, nullable=True)
    institution = Column(String(20), nullable=True)
    course = Column(String(20), nullable=True)
    year_of_study=Column(Integer, nullable=True)
    student_number = Column(Integer, nullable=True)
    graduation_year = Column(Integer, nullable=True)
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


#=====================
#APARTMENT_OWNER MODEL
#=====================
class ApartmentOwner(Base):
    __tablename__ = "apaerment_owners"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(VARCHAR(30), nullable=False, unique=True)
    phone_number = Column(Integer, nullable=False, unique=True)

