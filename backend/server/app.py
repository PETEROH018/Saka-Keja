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
from sqlalchemy import select, func, case
from sqlalchemy.exc import IntegrityError

apartment_schema = ApartmentSchema()
apartment_owner_schema = ApartmentOwnerSchema()


@app.route("/apartment", methods=["POST"])
def add_apartment():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        new_apartment = apartment_schema.load(data)
        db.session.add(new_apartment)
        db.session.commit()
        return (
            jsonify(
                "message", f"Added apartment with id {new_apartment.id} and its units"
            ),
            201,
        )

    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return (
            jsonify(
                {"error", f"Could not add the apartment due to this error, {str(e)}"}
            ),
            500,
        )


@app.route("/apartment-owners", methods=["POST"])
def add_apartment_owner():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        new_apartment_owner = apartment_owner_schema.load(data)
        db.session.add(new_apartment_owner)
        db.session.commit()
        return (
            jsonify(
                "message", f"Added apartment owner with id {new_apartment_owner.id}"
            ),
            201,
        )

    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return (
            jsonify(
                {
                    "error",
                    f"Could not add the apartment owner due to this error, {str(e)}",
                }
            ),
            500,
        )


# get/properties for a particular manager
@app.route("/manager-properties/<int: id>")
def get_manager_properties(id):
    apartment = Apartment.query.filter_by(owner_id=id).all()
    return jsonify(ApartmentSchema(many=True).dump(apartment))


@app.route("/apartment/<int:id>/units")
def get_manager_property_units(id):
    units = Unit.query.filter_by(apartment_id=id).all()
    return jsonify(UnitSchema(many=True).dump(units))


@app.route("/manager/<int:id>/metrics")
def get_manager_metrics(id):
    listing_query = select(func.count(Apartment.id)).where(Apartment.owner_id == id)
    views_query = select(func.sum(Apartment.total_views)).where(
        Apartment.owner_id == id
    )
    favorites_query = (
        select(func.count(StudentUnit.id))
        .join(StudentUnit.unit)
        .where(
            Unit.apartment_id.in_(select(Apartment.id).where(Apartment.owner_id == id)),
            StudentUnit.favorite.is_(True),
        )
    )
    listing_count = db.session.scalar(listing_query) or 0
    views_count = db.session.scalar(views_query) or 0
    favorites_count = db.session.scalar(favorites_query) or 0
    return jsonify(
        {"listings": listing_count, "views": views_count, "favorites": favorites_count}
    )


@app.route("/manager/<int:id>/performance")
def get_manager_performance(id):
    rows = db.session.execute(
        select(
            Unit.apartment_id.label("apartment_id"),
            func.count(Unit.id).label("total_units"),
            func.sum(case((Unit.status == "Vacant", 1), else_=0)).label("vacant_units"),
        )
        .where(
            Unit.apartment_id.in_(select(Apartment.id).where(Apartment.owner_id == id))
        )
        .group_by(Unit.apartment_id)
    ).all()

    result = []
    for apartment_id, total_units, vacant_units in rows:
        vacancy_rate = (vacant_units or 0) / (total_units or 1) * 100
        result.append(
            {
                "apartment_id": apartment_id,
                "total_units": total_units,
                "vacant_units": vacant_units or 0,
                "vacancy_rate": round(vacancy_rate, 2),
            }
        )

    return jsonify(result)


@app.route("/payments", methods=["POST"])
def add_payment():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    required_fields = ["student_unit_id", "amount", "payment_method"]

    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return (
            jsonify({"error": "Missing required fields", "fields": missing_fields}),
            400,
        )

    if data["amount"] <= 0:
        return jsonify({"error": "Amount must be greater than zero"}), 400

    try:
        student_unit = StudentUnit.query.get(data["student_unit_id"])

        if not student_unit:
            return jsonify({"error": "Student unit not found"}), 404

        new_payment = Payment(
            student_unit_id=data["student_unit_id"],
            amount=data["amount"],
            payment_method=data["payment_method"],
            transaction_reference=data.get("transaction_reference"),
        )

        db.session.add(new_payment)

        student_unit.deposit_paid += data["amount"]

        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Payment created successfully",
                    "payment": {
                        "id": new_payment.id,
                        "student_unit_id": new_payment.student_unit_id,
                        "amount": new_payment.amount,
                        "payment_method": new_payment.payment_method,
                        "payment_status": new_payment.payment_status,
                        "transaction_reference": new_payment.transaction_reference,
                    },
                }
            ),
            201,
        )

    except IntegrityError:
        db.session.rollback()

        return jsonify({"error": "Transaction reference already exists"}), 400

    except Exception as e:
        db.session.rollback()

        return jsonify({"error": f"Could not create payment: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
