from configs import db
from sqlalchemy_serializer import SerializerMixin

class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String, default='Pending')
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'))

    def __repr__(self):
        return f'<Payment {self.id} - {self.amount}>'
