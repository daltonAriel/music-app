from functools import wraps
from flask import jsonify
from data import UserRepository
from flask_jwt_extended import get_jwt_identity


def hasRole(roles=[]):
    def wrapper(fn):
        @wraps(fn)
        def wrapped(*args, **kwargs):
            userRepository = UserRepository()
            userId = get_jwt_identity()
            user = userRepository.getById(userId)

            if user is not None and user.active:
                userRoles = [rol.name for rol in user.roles]
                if all(role in userRoles for role in roles):
                    return fn(*args, **kwargs)
                else:
                    return (
                        jsonify(
                            {
                                "message": "Error, you don't have permission to access this resource."
                            }
                        ),
                        403,
                    )
            else:
                return jsonify({"message": "Error, account is not active."}), 401

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
                if any(role in userRoles for role in roles):
                    return fn(*args, **kwargs)
                else:
                    return (
                        jsonify(
                            {
                                "message": "Error, you don't have permission to access this resource."
                            }
                        ),
                        403,
                    )
            else:
                return jsonify({"message": "Error, account is not active."}), 401

        return wrapped

    return wrapper
