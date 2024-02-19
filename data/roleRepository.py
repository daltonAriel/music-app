from extensions import db, bc
from models.role import Role
from sqlalchemy import func


class RoleRepository:
    def getByName(self, name):
        query = db.session.query(Role).filter(Role.name == name).first()
        return query
