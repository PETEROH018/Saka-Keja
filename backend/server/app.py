from models import db, UnitAmenity, UnitAmenityJoining, Unit
from configs import *
from schema import (
    unit_amenity_schema,
    unit_amenities_schema,
    unit_amenity_joining_schema,
    unit_amenities_joining_schema,
)

# ---------- unit_amenities ----------

@app.route("/unit_amenities", methods=["GET"])
def get_unit_amenities():
    amenities = UnitAmenity.query.all()
    return jsonify(unit_amenities_schema.dump(amenities))


@app.route("/unit_amenities/<int:amenity_id>", methods=["GET"])
def get_unit_amenity(amenity_id):
    amenity = UnitAmenity.query.get_or_404(amenity_id)
    return jsonify(unit_amenity_schema.dump(amenity))


@app.route("/unit_amenities", methods=["POST"])
def create_unit_amenity():
    data = request.get_json()
    amenity = UnitAmenity(
        name=data["name"],
        description=data.get("description"),
        iconUrl=data.get("iconUrl"),
    )
    db.session.add(amenity)
    db.session.commit()
    return jsonify(unit_amenity_schema.dump(amenity)), 201


@app.route("/unit_amenities/<int:amenity_id>", methods=["DELETE"])
def delete_unit_amenity(amenity_id):
    amenity = UnitAmenity.query.get_or_404(amenity_id)
    db.session.delete(amenity)
    db.session.commit()
    return "", 204


# ---------- unit_amenities_joining ----------

@app.route("/unit_amenities_joining", methods=["GET"])
def get_unit_amenities_joining():
    links = UnitAmenityJoining.query.all()
    return jsonify(unit_amenities_joining_schema.dump(links))


@app.route("/units/<int:unit_id>/amenities", methods=["GET"])
def get_amenities_for_unit(unit_id):
    links = UnitAmenityJoining.query.filter_by(unitId=unit_id).all()
    return jsonify(unit_amenities_joining_schema.dump(links))


@app.route("/unit_amenities_joining", methods=["POST"])
def link_unit_amenity():
    data = request.get_json()
    link = UnitAmenityJoining(
        unitId=data["unitId"],
        amenityId=data["amenityId"],
    )
    db.session.add(link)
    db.session.commit()
    return jsonify(unit_amenity_joining_schema.dump(link)), 201


@app.route("/unit_amenities_joining/<int:link_id>", methods=["DELETE"])
def unlink_unit_amenity(link_id):
    link = UnitAmenityJoining.query.get_or_404(link_id)
    db.session.delete(link)
    db.session.commit()
    return "", 204


# ---------- units ----------

@app.route("/units", methods=["GET"])
def get_units():
    units = Unit.query.all()
    result = []
    for unit in units:
        unit_data = unit.to_dict()
        unit_data["amenities"] = [
            link.amenity.to_dict() for link in unit.amenity_links
        ]
        result.append(unit_data)
    return jsonify(result)



#-------------get/properties for a particular manager------------------
@app.route('/manager-properties/<int: id>')
def get_manager_properties(id):

    return

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)