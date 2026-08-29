from configs import *
from sqlalchemy.orm import relationship
class Student(db.Model):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(50), nullable=False, unique=True)
    phone_number = Column(String(20), nullable=False, unique=True)
    dob = Column(DateTime, nullable=True)
    institution = Column(String(50), nullable=True)
    course = Column(String(50), nullable=True)
    year_of_study=Column(Integer, nullable=True)
    student_number = Column(String(20), nullable=True)
    graduation_year = Column(Integer, nullable=True)
    location = Column(String(50), nullable=True)
    username = Column(String(30), unique=True)
    _password_hash = Column(String, nullable=False)
    student_units = relationship(
        "StudentUnit",
        back_populates="student",
        cascade="all, delete-orphan"
    )

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