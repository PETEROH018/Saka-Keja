from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from configs import db, app
from schema import StudentSchema, UnitSchema
from models.Student import Student
from models.Unit import Unit

# Instantiate Marshmallow schemas
student_schema = StudentSchema()
unit_schema = UnitSchema()

student_bp = Blueprint('student_bp', __name__)

# 1. Getting a student's information from the students table by id
@student_bp.route('/students/<int:id>', methods=['GET'])
def get_student_by_id(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(student_schema.dump(student)), 200


# 2. Patch for editing a student's information on the student table
@student_bp.route('/students/<int:id>', methods=['PATCH'])
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    try:
        # Load partial data into existing student instance
        updated_student = student_schema.load(data, instance=student, partial=True)
        db.session.commit()
        return jsonify(student_schema.dump(updated_student)), 200

    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not update student due to error: {str(e)}"}), 500


# 3. Getting one unit in a particular apartment
@student_bp.route('/apartments/<int:apartment_id>/units/<int:unit_id>', methods=['GET'])
def get_single_apartment_unit(apartment_id, unit_id):
    unit = Unit.query.filter_by(id=unit_id, apartment_id=apartment_id).first()
    if not unit:
        return jsonify({"error": "Unit not found for this apartment"}), 404

    return jsonify(unit_schema.dump(unit)), 200