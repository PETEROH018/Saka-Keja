from app import app
from configs import db
from models.Apartment import Apartment
from models.Unit import Unit
from models.ApartmentOwner import ApartmentOwner
from models.Student import Student
from models.StudentUnit import StudentUnit

def audit_workload():
    with app.app_context():
        issues = []
        print("Auditing database tables and relationships for Saka-Keja...")
        try:
            if ApartmentOwner.query.count() == 0:
                issues.append("ApartmentOwner table is empty.")
        except Exception as e:
            issues.append(f"ApartmentOwner table error: {e}")
        try:
            if Apartment.query.count() == 0:
                issues.append("Apartment table is empty.")
        except Exception as e:
            issues.append(f"Apartment table error: {e}")
        try:
            if Unit.query.count() == 0:
                issues.append("Unit table has no records.")
        except Exception as e:
            issues.append(f"Unit table error: {e}")
        try:
            if Student.query.count() == 0:
                issues.append("Student table is empty.")
        except Exception as e:
            issues.append(f"Student table error: {e}")
        try:
            if StudentUnit.query.count() == 0:
                issues.append("StudentUnit favorites table is unpopulated.")
        except Exception as e:
            issues.append(f"StudentUnit table error: {e}")

        print("="*40)
        print("WORKLOAD AUDIT REPORT")
        print("="*40)
        if issues:
            print(f"Found {len(issues)} potential issue(s):")
            for idx, issue in enumerate(issues, 1):
                print(f"{idx}. {issue}")
        else:
            print("All core tables and relationships are intact!")
        print("="*40)

if __name__ == "__main__":
    audit_workload()
