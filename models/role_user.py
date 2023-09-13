from extensions import db, ma
from models import *


class RoleUser(db.Model):
    __tablename__ = "role_user"
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.role_id"), primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False, default=db.func.now())


class RoleUserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RoleUser
