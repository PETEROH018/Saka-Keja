from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, MetaData, VARCHAR, DateTime
from sqlalchemy.orm import relationship, declarative_base

meta = MetaData()

Base = declarative_base(metadata=meta)

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
    password_hash = Column(String, nullable=False)

    


