from configs import app, db
from models.Student import Student

with app.app_context():
    db.drop_all()
    db.create_all()
    student1 = Student(name="Sonia Wangare", email="sonia@example.com")
    db.session.add(student1)
    db.session.commit()
    print("Database reset and seeded successfully")
