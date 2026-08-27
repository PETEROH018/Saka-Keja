from configs import db
from sqlalchemy_serializer import SerializerMixin

class StudentUnit(db.Model, SerializerMixin):
    __tablename__ = 'student_units'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'))

    def __repr__(self):
        return f'<StudentUnit {self.id}>'
