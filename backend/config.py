import os

class BaseConfig(object):
    DEBUG = os.getenv('DEBUG') == 'True' or True
    TESTING = os.getenv('TESTING') == 'True' or True
    DATABASE_URL = os.getenv('DATABASE_URL') or 'db'
    DATABASE_USER = os.getenv('DATABASE_USER') or 'root'
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD') or 'password'
    DATABASE_DB = os.getenv('DATABASE_DB') or 'contact-manager'
    SECRET_KEY = os.getenv('SECRET_KEY') or b'ASDF'

class BaseConfig(BaseConfig):
    DEBUG = os.getenv('DEBUG') == 'True' or True
    TESTING = os.getenv('TESTING') == 'True' or True
    DATABASE_URL = os.getenv('DATABASE_URL') or 'db'
    DATABASE_USER = os.getenv('DATABASE_USER') or 'root'
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD') or 'password'
    DATABASE_DB = os.getenv('DATABASE_DB') or 'contact-manager'
    SECRET_KEY = os.getenv('SECRET_KEY') or b'ASDF'

class TestingConfig(BaseConfig):
    DEBUG = False
    TESTING = True
    SECRET_KEY = b'123456'
    DATABASE_URL = os.getenv('DATABASE_URL') or 'db'
    DATABASE_USER = os.getenv('DATABASE_USER') or 'root'
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD') or 'password'
    DATABASE_DB = os.getenv('DATABASE_DB') or 'contact-manager' 