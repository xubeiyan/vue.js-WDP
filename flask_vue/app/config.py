from pathlib import Path

BASE_DIR = Path(__file__).parent

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{0}'.format(BASE_DIR.joinpath('db.sqlite'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False

if __name__ == '__main__':
    print(Config.SQLALCHEMY_DATABASE_URI)