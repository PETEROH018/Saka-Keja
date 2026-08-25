from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, MetaData
from sqlalchemy.orm import relationship, declarative_base

meta = MetaData()

Base = declarative_base(metadata=meta)

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)

