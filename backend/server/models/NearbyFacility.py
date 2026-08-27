from configs import db
from sqlalchemy_serializer import SerializerMixin

class NearbyFacility(db.Model, SerializerMixin):
    __tablename__ = 'nearby_facilities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    facility_type = db.Column(db.String)
    distance_km = db.Column(db.Float)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartments.id'))

    def __repr__(self):
        return f'<NearbyFacility {self.name}>'
