from flask import Blueprint, jsonify


RoleRoutes = Blueprint("RoleRoutes", __name__)


@RoleRoutes.route("/data")
def getData():
    pass
