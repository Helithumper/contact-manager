class BaseConfig(object):
    DEBUG = False
    TESTING = False


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = True
    DATABASE_URL = 'db'
    DATABASE_USER = 'root'
    DATABASE_PASSWORD = 'cf03a9bd7c7a7310ba15fe02eceb87ee04e7d40f89a5bea14a07bf56a2f42231'
    DATABASE_DB = 'contact-manager'