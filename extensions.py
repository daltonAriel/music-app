from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

db = SQLAlchemy(session_options={"autocommit": False, "autoflush": False})
ma = Marshmallow()
bc = Bcrypt()
sc = JWTManager()
