import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    MetaData,
    VARCHAR,
    DateTime,
)
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone


meta = MetaData()
bcrypt = Bcrypt()
Base = declarative_base(metadata=meta)
db = SQLAlchemy(metadata=meta)

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

db.init_app(app) # allows your Vite frontend on localhost:5173 to call this API