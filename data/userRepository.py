from extensions import db, bc
from models.user import User
from sqlalchemy import func


class UserRepository:
    def saveOne(self, user: User):
        db.session.add(user)
        db.session.commit()
        return user

    def getByCredentials(self, email, password):
        query = db.session.query(User).filter(User.email == email).first()

        if query is not None and bc.check_password_hash(query.password, password):
            return query
        else:
            return None

    def coutByEmail(self, email):
        query = db.session.query(func.count()).filter(User.email == email).scalar()
        return query

    def getById(self, id):
        query = db.session.query(User).filter(User.user_id == id).first()
        return query
