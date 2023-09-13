from extensions import db, ma, bc
from models.role import RoleSchema


class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    active = db.Column(db.Boolean(), unique=False, nullable=False)
    roles = db.relationship(
        "Role", secondary="role_user", backref=db.backref("users", lazy="dynamic")
    )


class UserSchema(ma.SQLAlchemyAutoSchema):
    roles = ma.Nested(RoleSchema, many=True, exclude=["role_id", "description"])

    class Meta:
        model = User
        include_fk = False
        load_instance = True
