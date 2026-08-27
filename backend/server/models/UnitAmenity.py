from configs import db
from sqlalchemy_serializer import SerializerMixin

class UnitAmenity(db.Model, SerializerMixin):
    __tablename__ = 'unit_amenities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    def __repr__(self):
        return f'<UnitAmenity {self.name}>'
