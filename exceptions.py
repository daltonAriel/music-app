from flask import Blueprint, jsonify
from sqlalchemy.exc import IntegrityError, DataError, SQLAlchemyError
from marshmallow.exceptions import ValidationError, MarshmallowError

blueprintException = Blueprint("blueprintException", __name__)


@blueprintException.app_errorhandler(IntegrityError)
def integrityError(e: IntegrityError):
    print(e)
    return (
        jsonify(
            {
                "message": "Database integrity error. A uniqueness constraint may have been violated.",
                "exception": str(e.orig),
            }
        ),
        500,
    )


@blueprintException.app_errorhandler(DataError)
def dataError(e: DataError):
    print(e)
    return (
        jsonify(
            {
                "message": "Database data error. The provided data is not valid.",
                "exception": str(e),
            }
        ),
        500,
    )


@blueprintException.app_errorhandler(ValidationError)
def validationError(e: ValidationError):
    print(e)
    return (
        jsonify(
            {
                "message": "Validation error. The provided data is not valid.",
                "exception": str(e),
            }
        ),
        400,
    )


@blueprintException.app_errorhandler(MarshmallowError)
def marshmallowError(e: MarshmallowError):
    print(e)
    return (
        jsonify(
            {
                "message": "An error occurred during data serialization/deserialization.",
                "exception": str(e),
            }
        ),
        500,
    )


@blueprintException.app_errorhandler(AttributeError)
def attributeError(e: AttributeError):
    print(e)
    return (
        jsonify(
            {
                "message": "An error occurred while accessing an attribute",
                "exception": str(e),
            }
        ),
        500,
    )


@blueprintException.app_errorhandler(SQLAlchemyError)
def sqlError(e: SQLAlchemyError):
    print(e)
    return (
        jsonify(
            {
                "message": "A database error occurred.",
                "exception": str(e),
            }
        ),
        500,
    )