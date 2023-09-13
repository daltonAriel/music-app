from flask import Blueprint, request, jsonify
from data.userRepository import UserRepository
from flask_jwt_extended import jwt_required, create_refresh_token

UserRoutes = Blueprint("UserRoutes", __name__)


@UserRoutes.route("/user", methods=["POST"])
def create():
    userRepository = UserRepository()
    return userRepository.saveOne(request.json)
