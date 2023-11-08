from functools import wraps
from flask import jsonify, g
from data import UserRepository
from flask_jwt_extended import get_jwt_identity, get_jwt
from utils import JwtUtils


def hasRole(roles=[]):
    def wrapper(fn):
        @wraps(fn)
        def wrapped(*args, **kwargs):
            userRepository = UserRepository()
            userId = get_jwt_identity()
            user = userRepository.getById(userId)

            if user is not None and user.active:
                userRoles = [rol.name for rol in user.roles]
                jwt = get_jwt()

                if "roles" in jwt:
                    if all(role in jwt["roles"] for role in userRoles) and all(
                        role in userRoles for role in jwt["roles"]
                    ):
                        g.rolesToken = None
                    else:
                        jwtUtils = JwtUtils()
                        g.rolesToken = jwtUtils.createToken(user)

                if all(role in userRoles for role in roles):
                    return fn(*args, **kwargs)
                else:
                    return (
                        jsonify(
                            {
                                "message": "Error, you don't have permission to access this resource.",
                                "error": "Forbidden",
                            }
                        ),
                        403,
                    )
            else:
                return (
                    jsonify(
                        {
                            "message": "Error, account is not active.",
                            "error": "Disabled",
                        }
                    ),
                    401,
                )

        return wrapped

    return wrapper


def hasAnyRole(roles=[]):
    def wrapper(fn):
        @wraps(fn)
        def wrapped(*args, **kwargs):
            userRepository = UserRepository()
            userId = get_jwt_identity()
            user = userRepository.getById(userId)

            if user is not None and user.active:
                userRoles = [rol.name for rol in user.roles]
                jwt = get_jwt()

                if "roles" in jwt:
                    if all(role in jwt["roles"] for role in userRoles) and all(
                        role in userRoles for role in jwt["roles"]
                    ):
                        g.rolesToken = None
                    else:
                        jwtUtils = JwtUtils()
                        g.rolesToken = jwtUtils.createToken(user)

                if any(role in userRoles for role in roles):
                    return fn(*args, **kwargs)
                else:
                    return (
                        jsonify(
                            {
                                "message": "Error, you don't have permission to access this resource.",
                                "error": "Forbidden",
                            }
                        ),
                        403,
                    )
            else:
                return (
                    jsonify(
                        {
                            "message": "Error, account is not active.",
                            "error": "Disabled",
                        }
                    ),
                    401,
                )

        return wrapped

    return wrapper
