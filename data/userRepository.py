from flask import jsonify, make_response
from extensions import db, bc
from models.user import User, UserSchema
from models.role import Role
from flask_jwt_extended import create_access_token

from marshmallow.exceptions import ValidationError
from sqlalchemy.exc import IntegrityError, OperationalError, SQLAlchemyError


class UserRepository:
    pass
