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
    
    student_units = relationship(
        "StudentUnit",
        back_populates="student"
    )
    


#=====================
#APARTMENT_OWNER MODEL
#=====================
class ApartmentOwner(Base):
    __tablename__ = "apartment_owners"
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
        


#=====================
#STUDENT_UNIT MODEL
#=====================

class StudentUnit(Base):
    __tablename__ = "student_units"

    id = Column(Integer, primary_key=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False
    )

   # TODO: Add Unit model relationship once Unit table is implemented
   
    date_left = Column(DateTime, nullable=True)

    date_occupied = Column(
        DateTime,
        nullable=False
    )

    favorite = Column(
        Boolean,
        default=False,
        nullable=False
    )

    repairs = Column(
        String,
        nullable=True
    )

    deposit_paid = Column(
        Integer,
        default=0,
        nullable=False
    )
    
    student = relationship(
        "Student",
        back_populates="student_units"
    )
    