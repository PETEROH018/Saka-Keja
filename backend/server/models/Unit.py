from configs import db

class Unit(db.Model):
    __tablename__ = 'units'
    id = db.Column(db.Integer, primary_key=True)
    unit_code = db.Column(db.String(20), nullable=False)
    apartment_id = db.Column(db.Integer, nullable=False)
