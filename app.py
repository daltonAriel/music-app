import os
from flask import Flask
from extensions import db, ma, bc, sc
from routes import userRoutes, roleRoutes
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///music.sql"
app.config["SQLALCHEMY_ECHO"] = True

app.register_blueprint(userRoutes.UserRoutes)
app.register_blueprint(roleRoutes.RoleRoutes)

db.init_app(app)
ma.init_app(app)
bc.init_app(app)
sc.init_app(app)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
