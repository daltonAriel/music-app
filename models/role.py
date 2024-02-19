from extensions import db, ma
from sqlalchemy import Enum
from enums import RoleEnum

class Role(db.Model):
    __tablename__ = "roles"
    role_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(Enum(RoleEnum), unique=True, nullable=False)


class RoleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Role
        load_instance = True
