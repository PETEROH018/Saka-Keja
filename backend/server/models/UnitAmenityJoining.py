from configs import db
from sqlalchemy_serializer import SerializerMixin

class UnitAmenityJoining(db.Model, SerializerMixin):
    __tablename__ = 'unit_amenity_joinings'

    id = db.Column(db.Integer, primary_key=True)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'))
    unit_amenity_id = db.Column(db.Integer, db.ForeignKey('unit_amenities.id'))

    def __repr__(self):
        return f'<UnitAmenityJoining {self.id}>'
