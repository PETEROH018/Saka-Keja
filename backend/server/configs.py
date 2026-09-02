import os
from flask_migrate import Migrate
from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    MetaData,
    VARCHAR,
    DateTime,
    Text,
    JSON,
)
from sqlalchemy.ext.hybrid import hybrid_property

meta = MetaData()
db = SQLAlchemy(metadata=meta)
bcrypt = Bcrypt()
app = Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///saka_keja.db"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

LOCAL_DB_URI = "postgresql+psycopg2://postgres:1234@localhost:5432/saka_keja"
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        LOCAL_DB_URI
    )
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY",
    "saka-keja-dev-secret-key-2026-strong-32bytes"
)
app.config["JWT_ALGORITHM"] = "HS256"


db.init_app(app)
migrate = Migrate(app, db) 
bcrypt.init_app(app)
CORS(app,methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])