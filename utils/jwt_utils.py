from flask_jwt_extended import create_access_token, create_refresh_token
from models import User


class JwtUtils:
    def createToken(self, user: User):
        token = create_access_token(
            identity=user.user_id,
            additional_claims={
                "roles": [role.name.value for role in user.roles],
                "user_name": user.user_id,
                "email": user.email,
            },
        )
        return token

    def createRefreshToken(self, identity):
        freshToken = create_refresh_token(identity=identity)
        return freshToken
