from configs import db
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean, String
from sqlalchemy.orm import relationship

class StudentUnit(db.Model):
    __tablename__ = "student_units"
    # ... rest of your code

    id = Column(Integer, primary_key=True)

    student_id = Column(
        Integer,
        ForeignKey("students.id"),
        nullable=False
    )
    
    unit_id = Column(
        Integer,
        ForeignKey("units.id"),
        nullable=False
    )
        
    date_left = Column(DateTime, nullable=True)

    date_occupied = Column(
        DateTime,
        nullable= True
    )

    favorite = Column(
        Boolean,
        default=False,
        nullable=False
    )

    viewed = Column(
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
    
    unit = relationship(
    "Unit",
    back_populates="student_units"
    )
    
    payments = relationship(
    "Payment",
    back_populates="student_unit",
    cascade="all, delete-orphan"
    )
