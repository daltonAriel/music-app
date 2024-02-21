from flask import Blueprint, jsonify, request, g
from data import UserRepository
from models import UserSchema
from utils import JwtUtils
from flask_jwt_extended import jwt_required
from utils import hasRole
from extensions import db, bc
from data import RoleRepository
from utils import EmailSchema

UserRoutes = Blueprint("UserRoutes", __name__)


@UserRoutes.route("/user/register", methods=["POST"])
def register():
    userRepository = UserRepository()
    roleRepository = RoleRepository()
    schema = UserSchema()
    userObj = schema.load(request.get_json())

    if userRepository.coutByEmail(userObj.email) >= 1:
        return jsonify({"message": "Registration failed, user already exists."}), 400

    userObj.password = bc.generate_password_hash(userObj.password).decode('utf-8')

    user = userRepository.saveOne(userObj)
    userRole = roleRepository.getByName('ROLE_USER')
    user.roles.append(userRole)
    db.session.flush()

    if user is not None:
        jwtUtil = JwtUtils()
        accessToken = jwtUtil.createToken(user)
        refreshToken = jwtUtil.createRefreshToken(identity=user.user_id)
        db.session.commit()
        return jsonify({"accessToken": accessToken, "refreshToken": refreshToken}), 201

    return jsonify({"message": "Registration failed"}), 400


@UserRoutes.route("/user/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    userRepository = UserRepository()
    user = userRepository.getByCredentials(email, password)

    if user is None:
        return jsonify({"message": "Incorrect credentials"}), 401

    if not user.active:
        return jsonify({"message": "Error, account is not active"}), 403

    jwtUtil = JwtUtils()
    accessToken = jwtUtil.createToken(user)
    refreshToken = jwtUtil.createRefreshToken(identity=user.user_id)
    return jsonify({"accessToken": accessToken, "refreshToken": refreshToken}), 200


@UserRoutes.route("/user/email-count", methods=["POST"])
def getProtectedData():
    email = request.json.get("email")
    schema = EmailSchema()
    data:EmailSchema = schema.load({'email':email})
    userRepository = UserRepository()
    count = userRepository.coutByEmail(data['email'])
    return jsonify({"count": count}), 200
