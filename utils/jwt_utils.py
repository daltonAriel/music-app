from flask_jwt_extended import create_access_token, create_refresh_token
from models import User


class JwtUtils:
    def createToken(self, user: User):
        token = create_access_token(
            identity=user.user_id,
            additional_claims={
                "roles": [role.name for role in user.roles],
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
            },
        )
        return token

    def createRefreshToken(self, identity):
        freshToken = create_refresh_token(identity=identity)
        return freshToken
