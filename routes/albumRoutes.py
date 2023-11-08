import os
import shutil
from werkzeug.utils import secure_filename
import uuid

from flask import Blueprint, request, jsonify, json
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError, DataError, SQLAlchemyError

from data import AlbumRepository
from models import AlbumSchema, Album
from constants import ALLOWED_IMAGE_EXTENSIONS
from utils import createAlbumFolder, createImageAlbum, removeAlbumFolder, removeImageAlbum

AlbumRoutes = Blueprint("AlbumRoutes", __name__)


@AlbumRoutes.route("/album", methods=["POST"])
@jwt_required()
def save():
    albumSchema = AlbumSchema()
    albumRepository = AlbumRepository()

    albumData: Album = albumSchema.loads(request.form["albumData"])
    imageData = request.files["albumFile"]

    if not imageData.content_type.split("/")[-1] in ALLOWED_IMAGE_EXTENSIONS:
        return jsonify({"error": "Bad Request", "exception": "Invalid file type"}), 400

    uniqueName = f"album-{uuid.uuid4().hex}"
    imageName = f"img-album-{uniqueName}.{imageData.content_type.split('/')[-1]}"

    try:
        createAlbumFolder(uniqueName)
        createImageAlbum(imageName, imageData)
        
        albumData.path = uniqueName
        albumData.image_path = imageName
        albumData.user_id = get_jwt_identity()
        album = albumRepository.saveOne(albumData)

        return albumSchema.dumps(album, many=False)

    except Exception as e:
        removeAlbumFolder(uniqueName)
        removeImageAlbum(imageName)
        raise e
