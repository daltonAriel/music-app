from flask import Blueprint, jsonify, request
from data import UserRepository
from models import UserSchema
from utils import JwtUtils

UserRoutes = Blueprint("UserRoutes", __name__)


@UserRoutes.route("/user/register", methods=["POST"])
def register():
    userRepository = UserRepository()
    schema = UserSchema()
    usuario = schema.load(request.get_json())
    if userRepository.coutByEmail(usuario.email) >= 1:
        return jsonify({"message": "Registration failed, user alredy exist."}), 400
    else:
        user = userRepository.saveOne(usuario)
        if user is not None:
            jwtUtil = JwtUtils()
            token = jwtUtil.createToken(user)
            return jsonify({"token": token}), 201
        else:
            return jsonify({"message": "Registration failed"}), 400


@UserRoutes.route("/user/login", methods=["POST"])
def login():
    userRepository = UserRepository()
    user = userRepository.getByCredentials(email="d4@gmail.coma", password="hola123")
    if user is not None:
        jwtUtil = JwtUtils()
        token = jwtUtil.createToken(user)
        return jsonify({"token": token}), 200
    else:
        return jsonify({"message": "Incorrect credentials"}), 401
