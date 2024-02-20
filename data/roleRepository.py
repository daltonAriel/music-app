from extensions import db
from models.role import Role


class RoleRepository:
    def getByName(self, name):
        query = db.session.query(Role).filter(Role.name == name).first()
        return query
