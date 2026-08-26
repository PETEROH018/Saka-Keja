from configs import *

class Payment(Base):
    __tablename__ = "payments"

    id = Column(
        Integer,
        primary_key=True
    )

    amount = Column(
        Integer,
        nullable=False
    )

    payment_method = Column(
        String(30),
        nullable=False
    )

    payment_status = Column(
        String(30),
        default="Pending",
        nullable=False
    )

    transaction_reference = Column(
        String(100),
        nullable=True,
        unique=True
    )

    payment_date = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
        
    student_units = relationship(
    "StudentUnit",
    back_populates="student"
    )
    
    
        