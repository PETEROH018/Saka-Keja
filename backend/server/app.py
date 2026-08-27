from configs import *
from schema import *
from models import Unit,Apartment,ApartmentAmenity,ApartmentAmenityJoining,ApartmentOwner,Student,NearbyFacility,UnitAmenity,UnitAmenityJoining,StudentUnit,Payment
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
@app.route("/manager-properties/<int:id>")
def get_manager_properties(id):
    apartment = Apartment.query.filter_by(owner_id=id).all()
    return jsonify(ApartmentSchema(many=True).dump(apartment))


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

@app.route('/apartments', methods=['GET'])
def get_all_apartments():
    try:
        apartments = Apartment.query.all()
        return jsonify(ApartmentSchema(many=True).dump(apartments)), 200
    except Exception as e:
        return jsonify({"error": f"Could not retrieve apartments due to this error: {str(e)}"}), 500

@app.route('/apartments/<int:id>', methods=['GET'])
def get_apartment_by_id(id):
    apartment = Apartment.query.get(id)
    if not apartment:
        return jsonify({"error": "Apartment not found"}), 404

    try:
        apartment.total_views = (apartment.total_views or 0) + 1
        db.session.commit()
        
        return jsonify(ApartmentSchema().dump(apartment)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not retrieve apartment due to this error: {str(e)}"}), 500

@app.route('/apartments/<int:id>/units', methods=['GET'])
def get_apartment_units(id):
    apartment = Apartment.query.get(id)
    if not apartment:
        return jsonify({"error": "Apartment not found"}), 404

    try:
        units = Unit.query.filter_by(apartment_id=id).all()
        return jsonify(UnitSchema(many=True).dump(units)), 200
    except Exception as e:
        return jsonify({"error": f"Could not retrieve units due to this error: {str(e)}"}), 500

@app.route("/units", methods=["GET"])
def get_all_units():
    try:
        units = Unit.query.all()
        return jsonify(UnitSchema(many=True).dump(units)), 200
    except Exception as e:
        return jsonify({"error": f"Could not retrieve units due to this error: {str(e)}"}), 500


# ========================
# STUDENT ENDPOINTS
# ========================


@app.route("/student/<int:id>/favorites", methods=["GET"])
def get_student_favorite_units(id):

    favorite_units = (
        db.session.query(Unit)
        .join(StudentUnit)
        .filter(StudentUnit.student_id == id, StudentUnit.favorite == True)
        .all()
    )

    return jsonify(UnitSchema(many=True).dump(favorite_units))


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

        new_payment = StudentUnit(
            student_id = data["student_id"],
            unit_id = data["unit_id"],
            amount=data["amount"],
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


@app.route("/students", methods=["POST"])
def add_student():

    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    required_fields = ["full_name", "email", "phone_number", "username", "password"]

    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return (
            jsonify({"error": "Missing required fields", "fields": missing_fields}),
            400,
        )

    try:
        existing_student = Student.query.filter(
            (Student.email == data["email"])
            | (Student.username == data["username"])
            | (Student.phone_number == data["phone_number"])
        ).first()

        if existing_student:
            return (
                jsonify(
                    {
                        "error": "Student with this email, username, or phone number already exists"
                    }
                ),
                409,
            )

        new_student = Student(
            full_name=data["full_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            dob=data.get("dob"),
            institution=data.get("institution"),
            course=data.get("course"),
            year_of_study=data.get("year_of_study"),
            student_number=data.get("student_number"),
            graduation_year=data.get("graduation_year"),
            location=data.get("location"),
            username=data["username"],
        )

        # Automatically hashes password using Student model setter
        new_student.password_hash = data["password"]

        db.session.add(new_student)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Student created successfully",
                    "student": {
                        "id": new_student.id,
                        "full_name": new_student.full_name,
                        "email": new_student.email,
                        "username": new_student.username,
                    },
                }
            ),
            201,
        )

    except IntegrityError:
        db.session.rollback()

        return jsonify({"error": "Student already exists"}), 409

    except Exception as e:
        db.session.rollback()

        return jsonify({"error": f"Could not create student: {str(e)}"}), 500


# Student login endpoint
@app.route("/api/students/login", methods=["POST"])
def student_login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        student = Student.query.filter_by(username=data["userName"]).first()

        if not student:
            return jsonify({"error": "Invalid credentials"}), 401

        if not student.authenticate(data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        import secrets
        token = secrets.token_urlsafe(32)

        return jsonify({
            "token": token,
            "user": {
                "id": student.id,
                "full_name": student.full_name,
                "username": student.username,
            }
        }), 200

    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500


    # Manager login endpoint
@app.route("/api/managers/login", methods=["POST"])
def manager_login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        manager = ApartmentOwner.query.filter_by(username=data["userName"]).first()

        if not manager:
            return jsonify({"error": "Invalid credentials"}), 401

        if not manager.authenticate(data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        # Generate a simple token 
        import secrets
        token = secrets.token_urlsafe(32)

        return jsonify({
            "token": token,
            "user": {
                "id": manager.id,
                "full_name": manager.full_name,
                "username": manager.username,
            }
        }), 200

    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)
