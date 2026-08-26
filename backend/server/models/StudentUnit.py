from configs import *

class StudentUnit(Base):
    __tablename__ = "student_units"

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
    
    unit = relationship(
    "Unit",
    back_populates="student_units"
    )
