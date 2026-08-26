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