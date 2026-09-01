import jwt
from datetime import datetime, timedelta, timezone

from configs import *
from schema import *
from models import (
    Unit,
    Apartment,
    ApartmentAmenity,
    ApartmentAmenityJoining,
    ApartmentOwner,
    Student,
    NearbyFacility,
    UnitAmenity,
    UnitAmenityJoining,
    StudentUnit,
    Payment,
)
from sqlalchemy import select, func, case
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.attributes import flag_modified
import re
import traceback


def create_auth_token(user_id, user_type, username, profile):
    issued_at = datetime.now(timezone.utc)
    payload = {
        "user_id": user_id,
        "user_type": user_type,
        "username": username,
        "profile": profile,
        "iat": issued_at,
        "exp": issued_at + timedelta(hours=24),
    }
    return jwt.encode(
        payload,
        app.config["SECRET_KEY"],
        algorithm=app.config["JWT_ALGORITHM"],
    )


def get_bearer_token():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    return auth_header.split(" ", 1)[1].strip()


def get_current_user():
    token = get_bearer_token()
    if not token:
        return None

    try:
        payload = jwt.decode(
            token,
            app.config["SECRET_KEY"],
            algorithms=[app.config["JWT_ALGORITHM"]],
        )
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

    user_id = payload.get("user_id")
    user_type = payload.get("user_type")

    if user_type == "student":
        return Student.query.get(user_id)
    if user_type == "manager":
        return ApartmentOwner.query.get(user_id)

    return None


def require_authentication():
    current_user = get_current_user()
    if not current_user:
        return None, (jsonify({"error": "Authentication required"}), 401)
    return current_user, None

apartment_schema = ApartmentSchema(session=db.session)
unit_schema = UnitSchema(session=db.session)
apartment_owner_schema = ApartmentOwnerSchema()
student_schema = StudentSchema()
apartment_amenities_schema = ApartmentAmenitySchema(session=db.session)
apartment_amenities_joining_schema = ApartmentAmenityJoiningSchema(session=db.session)
# nearby_facilities_schema = NearbyFacilitySchema(session=db.session)


@app.route("/", methods=["GET"])
def home():
    return (
        jsonify({"message": "Welcome to the Saka-Keja API", "status": "running"}),
        200,
    )


@app.route("/apartments", methods=["POST"])
def add_apartment():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        new_apartment_details = {
            'name': data.get('buildingName'),
            'type': data.get('propertyType'),
            'description': data.get('description'),
            'location': data.get('location'),
            'imageURLs': data.get('images'),
            'owner_id': 40
            }

        # Adding an apartment's details to the apartments table
        new_apartment = apartment_schema.load(new_apartment_details)
        db.session.add(new_apartment)
        db.session.flush()
        
        # new_nearby_facilities = nearby_facilities_schema.load(data.get('socialAmenities'), many=True)
        # db.session.add_all(new_nearby_facilities)
        # db.session.flush()

        # Adding the new amenities added by a user to the apartment amenities table
        added_apartment_amenities = apartment_amenities_schema.load(data.get('apartmentAmenities'),many=True)
        db.session.add_all(added_apartment_amenities)
        db.session.flush()

        amenity_mapping = {
            "furnished": "Furnished",
            "wifiIncluded": "WiFi Available",
            "waterReliable": "Water Reliable",
            "securityGuard": "Security Guard"
        }

        # Getting the names of default amenities that the client selected
        selected_names = [ amenity_name for field, amenity_name in amenity_mapping.items() if data.get(field) is True ]
        selected_apartment_amenities = ApartmentAmenity.query.filter(ApartmentAmenity.name.in_(selected_names)).all()

        new_apartment_amenities = [*added_apartment_amenities,*selected_apartment_amenities]

        # Adding all amenities of a particular apartment to the apartment amenities joining table
        for amenity in new_apartment_amenities:
            association = ApartmentAmenityJoining(amenity=amenity,apartment=new_apartment)
            db.session.add(association)

        db.session.add_all(new_apartment_amenities)
        db.session.flush()

        for unit in data.get('units'):
            new_unit_details = {
                        'category':unit.get('unitType'),
                        'description':unit.get('description'),
                        'rent':unit.get('monthlyRent'),
                        'deposit':unit.get('depositAmount'),
                        'bedrooms':unit.get('bedrooms'),
                        'bathrooms':unit.get('bathrooms'),
                        'size':unit.get('size'),
                        'maximum_occupants':unit.get('maxOccupants'),
                        'imageURLS':unit.get('images'),
                        'apartment_id':new_apartment.id
                }
            new_unit = unit_schema.load(new_unit_details)
            db.session.add(new_unit)
            db.session.flush()

            selected_unit_amenities = UnitAmenity.query.filter(UnitAmenity.name.in_(unit.get('unitAmenities'))).all()
            for amenity in selected_unit_amenities:
                    association = UnitAmenityJoining(amenity=amenity,unit=new_unit)
                    db.session.add(association)
            
            db.session.add_all(selected_unit_amenities)
            db.session.flush()

        db.session.commit()

        return (jsonify("message", f"Added apartment with id {new_apartment.id} and its units"),201,)

    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return (
            jsonify({"error", f"Could not add the apartment or units due to this error, {str(e)}"}),500,)


@app.route("/owners", methods=["POST"])
def add_apartment_owner():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    owner_payload = {
        "full_name": data.get("full_name") or data.get("fullName") or data.get("name"),
        "username": data.get("username")
        or data.get("userName")
        or data.get("user_name"),
        "password": data.get("password"),
        "email": data.get("email"),
        "phone_number": data.get("phoneNumber") or data.get("phone_number"),
        "location": data.get("location"),
    }

    try:
        validated = apartment_owner_schema.load(owner_payload)
        new_apartment_owner = ApartmentOwner(
            full_name=validated["full_name"],
            email=validated["email"],
            phone_number=validated["phone_number"],
            username=validated["username"],
            location=validated.get("location"),
        )
        new_apartment_owner.password_hash = owner_payload["password"]

        db.session.add(new_apartment_owner)
        db.session.commit()
        token = create_auth_token(
            new_apartment_owner.id,
            "manager",
            new_apartment_owner.username,
            "owner",
        )

        return (
            jsonify(
                {
                    "user_type": "manager",
                    "message": "Manager created successfully",
                    "token": token,
                    "user": {
                        "id": new_apartment_owner.id,
                        "name": new_apartment_owner.username,
                        "role": "owner",
                        "profile": "owner",
                    },
                }
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
                    "error": f"Could not add the apartment owner due to this error, {str(e)}",
                }
            ),
            500,
        )


@app.route("/owners/<int:id>/aparments")
def get_owner_aparments(id):
    apartments = Apartment.query.filter_by(owner_id=id).all()
    return jsonify(ApartmentSchema(many=True).dump(apartments))


@app.route("/owners/<int:id>/metrics")
def get_owner_metrics(id):
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


@app.route("/owners/<int:id>/performance")
def get_owner_performance(id):
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


@app.route("/apartments", methods=["GET"])
def get_all_apartments():
    try:
        apartments = Apartment.query.all()
        return jsonify(ApartmentSchema(many=True).dump(apartments)), 200
    except Exception as e:
        return (
            jsonify(
                {"error": f"Could not retrieve apartments due to this error: {str(e)}"}
            ),
            500,
        )


@app.route("/apartments/<int:id>", methods=["GET"])
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
        return (
            jsonify(
                {"error": f"Could not retrieve apartment due to this error: {str(e)}"}
            ),
            500,
        )


@app.route("/apartments/<int:id>/units", methods=["GET"])
def get_apartment_units(id):
    apartment = Apartment.query.get(id)
    if not apartment:
        return jsonify({"error": "Apartment not found"}), 404

    try:
        units = Unit.query.filter_by(apartment_id=id).all()
        return jsonify(UnitSchema(many=True).dump(units)), 200
    except Exception as e:
        return (
            jsonify({"error": f"Could not retrieve units due to this error: {str(e)}"}),
            500,
        )


@app.route('/owners/<int:id>', methods=['GET', 'PATCH', 'PUT'])
def update_owner(id):
    owner = ApartmentOwner.query.get(id)
    if not owner:
        return jsonify({"error": "Apartment owner not found"}), 404

    if request.method == 'GET':
        return jsonify(apartment_owner_schema.dump(owner)), 200

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        schema = ApartmentOwnerSchema(partial=True)
        validated_owner_data = schema.load(data)

        for key, value in validated_owner_data.items():
            setattr(owner, key, value)
        db.session.commit()

        return (
            jsonify(
                {
                    "message": "Owner details updated successfully",
                    "owner": schema.dump(owner),
                }
            ),
            200,
        )

    except ValidationError as err:
        return jsonify({"validation_errors": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return (
            jsonify({"error": "An internal server error occurred", "details": str(e)}),
            500,
        )

@app.route('/managers/<int:id>', methods=['GET', 'PATCH', 'PUT'])
def update_manager_alias(id):
    return update_owner(id)

@app.route("/apartments/<int:id>", methods=["PATCH", "PUT"])
def update_apartment(id):
    apartment = Apartment.query.get(id)
    if not apartment:
        return jsonify({"error": "Apartment not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    new_image_urls = data.pop("imageURLs", None)

    try:
        apartment_schema.load(data, instance=apartment, partial=True)
        if new_image_urls is not None:
            existing_image_urls = apartment.imageURLs or []
            apartment.imageURLs = existing_image_urls + new_image_urls
            flag_modified(apartment, "imageURLs")
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Apartment updated successfully",
                    "data": apartment_schema.dump(apartment),
                }
            ),
            200,
        )

    except ValidationError as err:
        return jsonify({"validation_errors": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update apartment", "error": str(e)}), 400


@app.route("/units/<int:id>", methods=["GET"])
def get_unit_by_id(id):

    unit = Unit.query.get(id)

    if not unit:
        return jsonify({"error": "Unit not found"}), 404

    try:
        return jsonify(UnitSchema().dump(unit)), 200

    except Exception as e:
        return jsonify({"error": f"Could not retrieve unit: {str(e)}"}), 500

@app.route("/units/<int:id>", methods=['PATCH', 'PUT', 'POST'])
def update_unit(id):

    unit = Unit.query.get(id)

    if not unit:
        return jsonify({"error": "Unit not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    new_image_urls = data.pop("imageURLs", None)

    try:

        unit_schema.load(data, instance=unit, partial=True)

        if new_image_urls is not None:

            existing_image_urls = unit.imageURLS or []

            unit.imageURLS = existing_image_urls + new_image_urls

            flag_modified(unit, "imageURLS")

        db.session.commit()

        return (
            jsonify(
                {"message": "Unit updated successfully", "data": unit_schema.dump(unit)}
            ),
            200,
        )

    except ValidationError as err:

        return jsonify({"validation_errors": err.messages}), 422

    except Exception as e:

        db.session.rollback()

        return jsonify({"message": "Failed to update unit", "error": str(e)}), 400


@app.route("/units/promoted", methods=["GET"])
def get_promoted_units():
    try:
        promoted_units = Unit.query.filter_by(promoted=True).all()

        return (
            jsonify(
                {
                    "total": len(promoted_units),
                    "items": UnitSchema(many=True).dump(promoted_units),
                }
            ),
            200,
        )

    except Exception as e:
        return (
            jsonify(
                {
                    "error": f"Could not retrieve promoted units due to this error: {str(e)}"
                }
            ),
            500,
        )


@app.route("/units", methods=["GET"])
def get_all_units():
    try:
        query = Unit.query

        shared = request.args.get("shared")
        if shared is not None and shared != "":
            query = query.filter(Unit.shared == (shared.lower() == "true"))
        max_rent = request.args.get("max_rent")
        if max_rent and max_rent.isdigit():
            query = query.filter(Unit.rent <= int(max_rent))

        bedrooms = request.args.get("bedrooms")
        if bedrooms:
            if bedrooms.lower() == "bedsitter":
                query = query.filter(Unit.category.ilike("bedsitter"))
            elif bedrooms == "3+":
                query = query.filter(Unit.bedrooms >= 3)
            elif bedrooms.isdigit():
                query = query.filter(Unit.bedrooms == int(bedrooms))

        units = query.all()
        return jsonify(UnitSchema(many=True).dump(units)), 200

    except Exception as e:

        import traceback

        traceback.print_exc()

        return jsonify({"error": f"Could not retrieve units: {str(e)}"}), 500


# ========================
# STUDENT ENDPOINTS
# ========================

@app.route("/students/<int:id>/favorites", methods=["GET"])
def get_student_favorite_units(id):
    favorite_units = (
        db.session.query(Unit)
        .join(StudentUnit)
        .filter(StudentUnit.student_id == id, StudentUnit.favorite == True)
        .all()
    )
    return jsonify(UnitSchema(many=True).dump(favorite_units))


@app.route("/students/<int:id>/viewed-units", methods=["GET"])
def get_student_viewed_units(id):

    viewed_units = (
        db.session.query(Unit)
        .join(StudentUnit)
        .filter(StudentUnit.student_id == id, StudentUnit.viewed == True)
        .all()
    )

    return jsonify(UnitSchema(many=True).dump(viewed_units))


@app.route("/units/<int:id>/book", methods=["POST"])
def book_unit(id):
    data = request.get_json(silent=True) or {}
    student_id = data.get("student_id")

    if not student_id:
        return jsonify({"error": "Student ID is required."}), 400

    unit = Unit.query.get(id)
    if not unit:
        return jsonify({"error": "Unit not found."}), 404

    student = Student.query.get(student_id)
    if not student:
        return jsonify({"error": "Student not found."}), 404

    existing_booking = StudentUnit.query.filter_by(
        student_id=student_id, unit_id=id
    ).first()
    if existing_booking:
        return (
            jsonify(
                {"error": "You already booked or joined the waitlist for this unit."}
            ),
            409,
        )

    if unit.current_occupants >= unit.maximum_occupants:
        return (
            jsonify(
                {
                    "error": "This unit is fully occupied. Please join the waiting list instead."
                }
            ),
            409,
        )

    try:
        student_unit = StudentUnit(
            student_id=student_id, unit_id=id, favorite=False, viewed=False
        )
        db.session.add(student_unit)
        unit.current_occupants = (unit.current_occupants or 0) + 1
        if unit.current_occupants >= unit.maximum_occupants:
            unit.status = "Occupied"
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Booking successful.",
                    "student_unit": {
                        "id": student_unit.id,
                        "student_id": student_id,
                        "unit_id": id,
                    },
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not book this unit: {str(e)}"}), 500


@app.route("/units/<int:id>/waitlist", methods=["POST"])
def join_waitlist(id):
    data = request.get_json(silent=True) or {}
    student_id = data.get("student_id")

    if not student_id:
        return jsonify({"error": "Student ID is required."}), 400

    unit = Unit.query.get(id)
    if not unit:
        return jsonify({"error": "Unit not found."}), 404

    student = Student.query.get(student_id)
    if not student:
        return jsonify({"error": "Student not found."}), 404

    existing_booking = StudentUnit.query.filter_by(
        student_id=student_id, unit_id=id
    ).first()
    if existing_booking:
        return (
            jsonify({"error": "You already joined this unit's waitlist or booked it."}),
            409,
        )

    try:
        student_unit = StudentUnit(
            student_id=student_id, unit_id=id, favorite=False, viewed=False
        )
        db.session.add(student_unit)
        unit.status = "Waitlist"
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "You have been added to the waiting list.",
                    "student_unit": {
                        "id": student_unit.id,
                        "student_id": student_id,
                        "unit_id": id,
                    },
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not join the waiting list: {str(e)}"}), 500


@app.route('/students/<int:id>', methods=['GET', 'PATCH', 'PUT'])
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    if request.method == 'GET':
        return jsonify(student_schema.dump(student)), 200

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    cleaned_data = {}
    for k, v in data.items():
        if v == "":
            cleaned_data[k] = None
        elif k in ["year_of_study", "graduation_year"] and v is not None:
            match = re.search(r'\d+', str(v))
            cleaned_data[k] = int(match.group()) if match else v
        else:
            cleaned_data[k] = v

    try:
        schema = StudentSchema(partial=True)
        validated_student_data = schema.load(cleaned_data)

        for key, value in validated_student_data.items():
            setattr(student, key, value)
        db.session.commit()

        return jsonify({
            "message": "Student details updated successfully",
            "student": schema.dump(student)
        }), 200

    except ValidationError as err:
        return jsonify({"validation_errors": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An internal server error occurred", "details": str(e)}), 500


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
            student_id=data["student_id"],
            unit_id=data["unit_id"],
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

    full_name = data.get("full_name") or data.get("fullName") or data.get("name")
    username = data.get("username") or data.get("userName") or data.get("user_name")
    phone_number = data.get("phoneNumber") or data.get("phone_number")

    try:
        existing_student = Student.query.filter(
            (Student.email == data["email"])
            | (Student.username == username)
            | (Student.phone_number == phone_number)
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
            full_name=full_name,
            email=data["email"],
            phone_number=phone_number,
            dob=data.get("dob"),
            institution=data.get("institution"),
            course=data.get("course"),
            year_of_study=data.get("year_of_study"),
            student_number=data.get("student_number"),
            graduation_year=data.get("graduation_year"),
            location=data.get("location"),
            username=username,
        )

        new_student.password_hash = data["password"]

        db.session.add(new_student)
        db.session.commit()

        token = create_auth_token(
            new_student.id,
            "student",
            new_student.username,
            "student",
        )

        return (
            jsonify(
                {
                    "user_type": "student",
                    "message": "Student created successfully",
                    "token": token,
                    "user": {
                        "id": new_student.id,
                        "name": new_student.username,
                        "role": "student",
                        "profile": "student",
                    },
                }
            ),
            201,
        )

    except IntegrityError:
        db.system.rollback() if hasattr(db, 'system') else db.session.rollback()
        return jsonify({"error": "Student already exists"}), 409

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not create student: {str(e)}"}), 500


# login endpoint
@app.route("/login", methods=["POST"])
def student_login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    userRole = data.get("userRole")
    userName = data.get("userName")
    password = data.get("password")

    try:
        if userRole == "student":
            student = Student.query.filter_by(username=userName).first()

            if not student:
                return jsonify({"error": "Invalid credentials"}), 401

            if not student.authenticate(password):
                return jsonify({"error": "Invalid credentials"}), 401

            token = create_auth_token(
                student.id,
                "student",
                student.username,
                "student",
            )

            return (
                jsonify(
                    {
                        "user_type": "student",
                        "token": token,
                        "user": {
                            "id": student.id,
                            "name": student.username,
                            "role": "student",
                            "profile": "student",
                        },
                    }
                ),
                200,
            )

        owner = ApartmentOwner.query.filter_by(username=userName).first()
        if not owner:
            return jsonify({"error": "Invalid credentials"}), 401

        if not owner.authenticate(password):
            return jsonify({"error": "Invalid credentials"}), 401

        token = create_auth_token(
            owner.id,
            "manager",
            owner.username,
            "owner",
        )

        return (
            jsonify(
                {
                    "user_type": "manager",
                    "token": token,
                    "user": {
                        "id": owner.id,
                        "name": owner.username,
                        "role": "owner",
                        "profile": "owner",
                    },
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500


@app.errorhandler(Exception)
def handle_global_exception(e):
    if hasattr(e, "code") and isinstance(e.code, int):
        return jsonify({"error": getattr(e, "description", "HTTP Error")}), e.code
    
    db.session.rollback()
    traceback.print_exc()
    
    return jsonify({
        "error": "An internal server error occurred",
        "exception_type": type(e).__name__,
        "details": str(e)
    }), 500
  
@app.route("/students/<int:id>/stats", methods=["GET"])
def student_stats(id):
    current_user, auth_error = require_authentication()
    if auth_error:
        return auth_error

    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    if current_user.id != id:
        return jsonify({"error": "You are not allowed to access this student's stats"}), 403

    viewed = StudentUnit.query.filter_by(student_id=id, viewed=True).count()
    favorites = StudentUnit.query.filter_by(student_id=id, favorite=True).count()

    return jsonify({"totalViewed": viewed, "savedProperties": favorites})


@app.route("/students/<int:student_id>/units/<int:unit_id>/view", methods=["POST"])
def mark_unit_view(student_id, unit_id):

    student_unit = StudentUnit.query.filter_by(
        student_id=student_id, unit_id=unit_id
    ).first()

    if not student_unit:
        student_unit = StudentUnit(student_id=student_id, unit_id=unit_id, viewed=True)

        db.session.add(student_unit)

    else:
        student_unit.viewed = True

    db.session.commit()

    return jsonify({"message": "Unit view recorded"}), 200


@app.route("/students/viewed-units/sync", methods=["POST"])
def sync_guest_viewed_units():
    current_user, auth_error = require_authentication()
    if auth_error:
        return auth_error

    data = request.get_json(silent=True) or {}
    unit_ids = data.get("unit_ids") or []

    if not isinstance(unit_ids, list):
        return jsonify({"error": "unit_ids must be a list"}), 400

    synced_count = 0

    for raw_id in unit_ids:
        try:
            unit_id = int(raw_id)
        except (TypeError, ValueError):
            continue

        unit = Unit.query.get(unit_id)
        if not unit:
            continue

        student_unit = StudentUnit.query.filter_by(
            student_id=current_user.id,
            unit_id=unit_id,
        ).first()

        if student_unit is None:
            student_unit = StudentUnit(
                student_id=current_user.id,
                unit_id=unit_id,
                viewed=True,
            )
            db.session.add(student_unit)
        else:
            student_unit.viewed = True

        synced_count += 1

    db.session.commit()
    return jsonify({"message": "Guest viewed units synced", "count": synced_count}), 200


@app.route("/students/<int:student_id>/units/<int:unit_id>/favorite", methods=["POST"])
def mark_unit_favorite(student_id, unit_id):

    student_unit = StudentUnit.query.filter_by(
        student_id=student_id, unit_id=unit_id
    ).first()

    if not student_unit:

        student_unit = StudentUnit(
            student_id=student_id, unit_id=unit_id, favorite=True
        )

        db.session.add(student_unit)

    else:
        student_unit.favorite = not student_unit.favorite

    db.session.commit()

    return jsonify({"favorite": student_unit.favorite}), 200



if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)