from configs import db

class ApartmentAmenity(db.Model):
    __tablename__ = 'apartment_amenities'
    id = db.Column(db.Integer, primary_key=True)
    apartment_id = db.Column(db.Integer, nullable=False)
    amenity_id = db.Column(db.Integer, nullable=False)
