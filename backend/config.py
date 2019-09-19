import os

class BaseConfig(object):
    DEBUG = False
    TESTING = False
    DATABASE_URL = os.getenv('DATABASE_URL') or 'db'
    DATABASE_USER = os.getenv('DATABASE_USER') or 'root'
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD') or 'password'
    DATABASE_DB = os.getenv('DATABASE_DB') or 'contact-manager'

class BaseConfig(BaseConfig):
    DEBUG = os.getenv('DEBUG') == 'True' or True
    TESTING = os.getenv('TESTING') == 'True' or True
    DATABASE_URL = os.getenv('DATABASE_URL') or 'db'
    DATABASE_USER = os.getenv('DATABASE_USER') or 'root'
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD') or 'password'
    DATABASE_DB = os.getenv('DATABASE_DB') or 'contact-manager'

class TestingConfig(BaseConfig):
    DEBUG = False
    TESTING = True
    DATABASE_URL = os.getenv('DATABASE_URL') or 'db'
    DATABASE_USER = os.getenv('DATABASE_USER') or 'root'
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD') or 'password'
    DATABASE_DB = os.getenv('DATABASE_DB') or 'contact-manager' 