import os

from datetime import datetime, timezone

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

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

LOCAL_DB_URI = "postgresql+psycopg2://postgres:1234@localhost:5432/saka_keja"

app = Flask(__name__)

if os.getenv("TESTING") == "1":
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
        "DATABASE_URL",
        LOCAL_DB_URI
    )

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

bcrypt.init_app(app)

CORS(app)