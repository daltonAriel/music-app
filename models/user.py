from extensions import db, ma
from models.role import RoleSchema
from marshmallow import validate, fields, EXCLUDE, pre_load
import re


class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    roles = db.relationship(
        "Role", secondary="role_user", backref=db.backref("users", lazy="dynamic")
    )


class UserSchema(ma.SQLAlchemyAutoSchema):
    user_name = ma.auto_field(
        validate=[
            validate.Length(
                max=80,
                min=8,
                error="Username must be less than 80 characters and more than 8 characters",
            )
        ]
    )
    email = ma.auto_field(
        validate=[
            validate.Email(error="Invalid email format!"),
            validate.Length(max=120, error="Email must be less than 120 characters"),
        ]
    )
    password = ma.auto_field(
        validate=[
            validate.Length(
                min=10, max=120, error="Password must be between 10 and 120 characters"
            )
        ]
    )
    roles = ma.Nested(
        RoleSchema, many=True, exclude=["role_id", "description"], missing=[]
    )
    active = fields.Boolean(missing=True)


    @pre_load
    def process_data(self, data, **kwargs):
        if "user_name" in data:
            _userName = data["user_name"]
            _userName = _userName.strip()
            _userName = re.sub(r"\s+", " ", _userName)
            data["user_name"] = _userName
        if "email" in data:
            data["email"] = str(data["email"]).lower()

        return data


    class Meta:
        model = User
        unknown = EXCLUDE
        include_fk = False
        load_instance = True
