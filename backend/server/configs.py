import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from sqlalchemy import MetaData

app = Flask(__name__)

# Database configuration
LOCAL_DB_URI = "postgresql+psycopg2://postgres:1234@localhost:5432/saka_keja"

if os.getenv("TESTING") == "1":
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        LOCAL_DB_URI
    )

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialize extensions once
metadata = MetaData()
db = SQLAlchemy(metadata=metadata)
db.init_app(app)

bcrypt = Bcrypt()
bcrypt.init_app(app)

CORS(app)  # Allows your Vite frontend to call this API