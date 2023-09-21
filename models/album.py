from extensions import db, ma
from datetime import datetime


class Album(db.Model):
    __tablename__ = "albums"

    album_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    path = db.Column(db.String(500), nullable=False, unique=True)
    public = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    image_path = db.Column(db.String(500), nullable=False)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow(),
        onupdate=datetime.utcnow(),
    )


class AlbumSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Album
        include_fk = False
        load_instance = False
