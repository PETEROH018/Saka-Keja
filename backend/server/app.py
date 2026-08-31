from configs import *
from schema import *
from models import Unit,Apartment,ApartmentAmenity,ApartmentAmenityJoining,ApartmentOwner,Student,NearbyFacility,UnitAmenity,UnitAmenityJoining,StudentUnit,Payment
from sqlalchemy import select, func, case
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.attributes import flag_modified

apartment_schema = ApartmentSchema()
unit_schema = UnitSchema()
apartment_owner_schema = ApartmentOwnerSchema()

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to the Saka-Keja API",
        "status": "running"
    }), 200

@app.route("/apartments", methods=["POST"])
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


@app.route("/owners", methods=["POST"])
def add_apartment_owner():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    owner_payload = {
        "full_name": data.get("full_name") or data.get("fullName") or data.get("name"),
        "username": data.get("username") or data.get("userName") or data.get("user_name"),
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
        return (
            jsonify(
                {
                    "user_type": "manager",
                    "message": "Manager created successfully",
                    "token": {
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


# get/aparments for a particular owner
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

@app.route('/owners/<int:id>', methods=['PATCH','PUT'])
def update_owner(id):
    owner = ApartmentOwner.query.get(id)
    if not owner:
        return jsonify({"error": "Apartment owner not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    try:
        schema = ApartmentOwnerSchema(partial=True)
        validated_owner_data = schema.load(data)

        for key,value in validated_owner_data.items():
            setattr(owner,key,value)
        db.session.commit()

        return jsonify({
            "message": "Owner details updated successfully",
            "owner": schema.dump(owner)
        }), 200

    except ValidationError as err:
        return jsonify({"validation_errors": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "An internal server error occurred", "details": str(e)}), 500

@app.route("/apartments/<int:id>", methods=['PATCH','PUT'])
def update_apartment(id):
    apartment=Apartment.query.get(id)
    if not apartment:
        return jsonify({"error": "Apartment not found"}), 404

    data=request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    new_image_urls = data.pop("imageURLs", None)

    try:
        apartment_schema.load( data, instance=apartment, partial=True )
        if new_image_urls is not None:
            existing_image_urls = apartment.imageURLs or []
            apartment.imageURLs = existing_image_urls + new_image_urls
            flag_modified(apartment, "imageURLs")
        db.session.commit()
        return jsonify({ "message": "Apartment updated successfully", "data": apartment_schema.dump(apartment) }), 200

    except ValidationError as err:
        return jsonify({"validation_errors": err.messages}), 422
    
    except Exception as e:
        db.session.rollback()
        return jsonify({ "message": "Failed to update apartment", "error": str(e) }), 400

@app.route("/units/<int:id>", methods=['PATCH','POST'])
def update_unit(id):
    unit=Unit.query.get(id)

    if not unit:
        return jsonify({"error": "Unit not found"}), 404
    data=request.get_json()
    if not data:
            return jsonify({"error": "No data provided"}), 400

    new_image_urls = data.pop("imageURLs", None)

    try:
        unit_schema.load( data, instance=unit, partial=True )
        if new_image_urls is not None:
            existing_image_urls = unit.imageURLS or []
            unit.imageURLs = existing_image_urls + new_image_urls
            flag_modified(unit, "imageURLS")
        db.session.commit()
        return jsonify({ "message": "Unit updated successfully", "data": apartment_schema.dump(unit) }), 200

    except ValidationError as err:
            return jsonify({"validation_errors": err.messages}), 422
        
    except Exception as e:
            db.session.rollback()
            return jsonify({ "message": "Failed to update unit", "error": str(e) }), 400


@app.route("/units/promoted", methods=["GET"])
def get_promoted_units():
    try:
        promoted_units = Unit.query.filter_by(promoted=True).all()

        return jsonify({
            "total": len(promoted_units),
            "items": UnitSchema(many=True).dump(promoted_units)
        }), 200

    except Exception as e:
        return jsonify({
            "error": f"Could not retrieve promoted units due to this error: {str(e)}"
        }), 500

@app.route("/units", methods=["GET"])
def get_all_units():
    try:
        query = Unit.query

        # Filter by shared status
        shared = request.args.get("shared")
        if shared is not None and shared != "":
            query = query.filter(Unit.shared == (shared.lower() == "true"))

        # Filter by max rent
        max_rent = request.args.get("max_rent")
        if max_rent and max_rent.isdigit():
            query = query.filter(Unit.rent <= int(max_rent))

        # Filter by bedrooms/category
        bedrooms = request.args.get("bedrooms")
        if bedrooms:
            if bedrooms.lower() == "bedsitter":
                query = query.filter(Unit.category.ilike("bedsitter"))
            elif bedrooms == "3+":
                query = query.filter(Unit.bedrooms >= 3)
            elif bedrooms.isdigit():
                query = query.filter(Unit.bedrooms == int(bedrooms))

        # Safely execute query
        units = query.all()

        # Amenity filtering post-fetch (prevents ORM relationship joins from throwing 500 errors)
        kitchenette = request.args.get("kitchenette") == "true"
        wardrobe = request.args.get("wardrobe") == "true"
        balcony = request.args.get("balcony") == "true"

        if kitchenette or wardrobe or balcony:
            filtered_units = []
            for u in units:
                # Safely inspect amenities array/relationship
                unit_amenities = [
                    link.amenity.name.lower() 
                    for link in getattr(u, 'unit_amenity_links', getattr(u, 'unit_amenities', [])) 
                    if getattr(link, 'amenity', None)
                ]
                
                match = True
                if kitchenette and not any("kitchen" in a for a in unit_amenities):
                    match = False
                if wardrobe and not any("wardrobe" in a for a in unit_amenities):
                    match = False
                if balcony and not any("balcony" in a for a in unit_amenities):
                    match = False

                if match:
                    filtered_units.append(u)
            units = filtered_units

        return jsonify(UnitSchema(many=True).dump(units)), 200

    except Exception as e:
        print(f"Error in GET /units: {str(e)}") # Prints exact trace in your terminal
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

        # Automatically hashes password using Student model setter
        new_student.password_hash = data["password"]

        db.session.add(new_student)
        db.session.commit()

        return (
            jsonify(
                {
                    "user_type": "student",
                    "message": "Student created successfully",
                    "token": {
                        "id": new_student.id,
                        "name": new_student.username,
                        "role": "student",
                        "profile": "student"
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

            return jsonify({
                "user_type": "student",
                "token": {
                    "id": student.id,
                    "name": student.username,
                    "role": "student",
                    "profile": "student"
                }
            }), 200

        owner = ApartmentOwner.query.filter_by(username=userName).first()        
        if not owner:
            return jsonify({"error": "Invalid credentials"}), 401

        if not owner.authenticate(password):
            return jsonify({"error": "Invalid credentials"}), 401

        return jsonify({
            "user_type": "manager",
            "token": {
                "id": owner.id,
                "name": owner.username,
                "role": "owner",
                "profile": "owner"
            }
        }), 200

    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500




if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)