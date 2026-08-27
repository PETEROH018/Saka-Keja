from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from configs import db
from models.Student import Student
from schema import StudentSchema

student_bp = Blueprint("student_bp", __name__)
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
@student_bp.route("/students", methods=["GET"])
def get_students():
    students = Student.query.all()
    return jsonify(students_schema.dump(students)), 200

@student_bp.route("/students/<int:id>", methods=["GET"])
def get_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student_schema.dump(student)), 200

@student_bp.route("/students", methods=["POST"])
def add_student():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    try:
        new_student = student_schema.load(data)
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"message": f"Student added with id {new_student.id}", "student": student_schema.dump(new_student)}), 201
    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not add student: {str(e)}"}), 500
@student_bp.route("/students/<int:id>", methods=["PATCH"])
def update_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    try:
        updated_student = student_schema.load(data, instance=student, partial=True)
        db.session.commit()
        return jsonify({"message": "Student profile updated successfully", "student": student_schema.dump(updated_student)}), 200
    except ValidationError as err:
        return jsonify({"error": "Validation failed", "messages": err.messages}), 422
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not update student: {str(e)}"}), 500

@student_bp.route("/students/<int:id>", methods=["DELETE"])
def delete_student(id):
    student = Student.query.get(id)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    try:
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message": f"Student with id {id} deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Could not delete student: {str(e)}"}), 500
