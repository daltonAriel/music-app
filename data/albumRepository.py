from extensions import db
from models import Album
import uuid


class AlbumRepository:
    def saveOne(self, album: Album):
        db.session.add(album)
        db.session.commit()
        return album
