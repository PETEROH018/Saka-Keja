from configs import db

class ApartmentAmenityJoining(db.Model):
    __tablename__ = 'apartment_amenity_joining'
    id = db.Column(db.Integer, primary_key=True)
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartments.id'))
    amenity_id = db.Column(db.Integer, db.ForeignKey('apartment_amenities.id'))
