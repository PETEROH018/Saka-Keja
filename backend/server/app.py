from flask import request, jsonify
from marshmallow import ValidationError
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
from student_routes import student_bp

app.register_blueprint(student_bp)
apartment_schema = ApartmentSchema()
apartment_owner_schema = ApartmentOwnerSchema()
@app.route("/")
def index():
    return jsonify({"status": "success", "message": "Welcome to Saka-Keja API"}), 200

@app.route("/apartment", methods=["POST"])
def add_apartment():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    try:
        new_apartment = apartment_schema.load(data)
        db.session.add(new_apartment)
        db.session.commit()
        return jsonify({"message": f"Added apartment with id {new_apartment.id}"}), 201
    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not add apartment: {str(e)}"}), 500

@app.route("/apartment-owners", methods=["POST"])
def add_apartment_owner():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    try:
        new_owner = apartment_owner_schema.load(data)
        db.session.add(new_owner)
        db.session.commit()
        return jsonify({"message": f"Added apartment owner with id {new_owner.id}"}), 201
    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not add owner: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
