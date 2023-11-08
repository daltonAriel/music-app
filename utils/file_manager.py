import os, shutil

from constants import ALBUM_PATH, IMAGE_PATH

def createAlbumFolder(uniqueName):
    os.makedirs(ALBUM_PATH + uniqueName)


def createImageAlbum(imageName, fileImage):
    filepath = os.path.join(IMAGE_PATH, imageName)
    fileImage.save(filepath)


def removeAlbumFolder(uniqueName):
    if os.path.exists(f"{ALBUM_PATH}{uniqueName}"):
        shutil.rmtree(f"{ALBUM_PATH}{uniqueName}")


def removeImageAlbum(imageName):
    if os.path.exists(f"{IMAGE_PATH}{imageName}"):
        os.remove(f"{IMAGE_PATH}{imageName}")