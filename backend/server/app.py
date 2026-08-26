from configs import *
from schema import *
from models.Unit import Unit
from models.Apartment import Apartment
from models.ApartmentAmenity import ApartmentAmenity
from models.ApartmentAmenityJoining import ApartmentAmenityJoining
from models.ApartmentOwner import ApartmentOwner
from models.Student import Student
from models.NearbyFacility import NearbyFacility
from models.UnitAmenity import UnitAmenity
from models.UnitAmenityJoining import UnitAmenityJoining
from models.StudentUnit import StudentUnit
from models.Payment import Payment
from sqlalchemy import select, func

#-------------get/properties for a particular manager------------------
@app.route('/manager-properties/<int: id>')
def get_manager_properties(id):
    apartment = Apartment.query.filter_by(owner_id=id).all()
    return jsonify(ApartmentSchema(many=True).dump(apartment))

@app.route('/apartment/<int:id>/units')
def get_manager_property_units(id):
    units = Unit.query.filter_by(apartment_id=id).all()
    return jsonify(UnitSchema(many=True).dump(units))

@app.route('/manager/<int:id>/metrics')
def get_manager_metrics(id):
    listing_query = select(func.count(Apartment.id)).where(Apartment.owner_id == id)
    views_query = select(func.sum(Apartment.total_views)).where(Apartment.owner_id == id)
    favorites_query =  select(func.count(StudentUnit.id)).join(StudentUnit.unit).where(
            Unit.apartment_id.in_(
                select(Apartment.id).where(Apartment.owner_id == id)
            ),
            StudentUnit.favorite.is_(True),
        )
    listing_count = db.session.scalar(listing_query) or 0
    views_count = db.session.scalar(views_query) or 0
    favorites_count = db.session.scalar(favorites_query) or 0
    return jsonify({
        "listings": listing_count,
        "views": views_count,
        "favorites": favorites_count
    })
@app.route('/manager/<int:id>/performance')
def get_manager_performance(id):
    vacant_apartments = db.session.scalar(
    select(func.count(func.distinct(Apartment.id)))
    .join(Unit, Unit.apartment_id == Apartment.id)
    .where(Apartment.owner_id == id, Unit.status == "Vacant")
    ) or 0
    total_apartments = db.session.scalar(
    select(func.count(func.distinct(Apartment.id))).where(Apartment.owner_id == id)
    ) or 0
    vacancy_rate = (vacant_apartments/total_apartments) * 100


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)