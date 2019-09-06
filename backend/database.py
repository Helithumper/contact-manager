import pymysql.cursors

from flask import current_app
from flask import g

def get_db():
    """Connect to the configured Database"""
    if "db" not in g:
        g.db = pymysql.connect(host=current_app.config['DATABASE_URL'],
                             user=current_app.config['DATABASE_USER'],
                             password=current_app.config['DATABASE_PASSWORD'],
                             db=current_app.config['DATABASE_DB'],
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    return g.db

def close_db(e=None):
    """Close the database connection"""
    db = g.pop("db", None)

    if db is not None:
        db.close()

def init_app(app):
    """Register database functions with the Flask app."""
    app.teardown_appcontext(close_db)