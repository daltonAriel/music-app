from flask import Blueprint, jsonify, request, g
from data import UserRepository
from models import UserSchema
from utils import JwtUtils
from flask_jwt_extended import jwt_required
from utils import hasRole

UserRoutes = Blueprint("UserRoutes", __name__)


@UserRoutes.route("/user/register", methods=["POST"])
def register():
    userRepository = UserRepository()
    schema = UserSchema()
    usuario = schema.load(request.get_json())

    if userRepository.coutByEmail(usuario.email) >= 1:
        return jsonify({"message": "Registration failed, user already exists."}), 400

    user = userRepository.saveOne(usuario)

    if user is not None:
        jwtUtil = JwtUtils()
        accessToken = jwtUtil.createToken(user)
        refreshToken = jwtUtil.createRefreshToken(identity=user.user_id)
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


@UserRoutes.route("/user/data", methods=["POST"])
@jwt_required()
@hasRole(['customRole'])
def getProtectedData():
    print('================')
    print(g.get('rolesToken'))
    print('================')
    return jsonify([1, 2, 3, 4, 5])
