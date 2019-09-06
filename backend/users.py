from database import get_db
from flask import session, Response
from functools import wraps
import pymysql
import bcrypt
import uuid

def authenticate(username, password):
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute("""SELECT Username, Password, UUID, isAdmin
                          FROM Users where Username=%s""",(username))
        user = cursor.fetchone()
    
    if user and bcrypt.checkpw(password.encode('utf8'), user['Password'].encode('utf8')):
        return {'UUID':user['UUID'], 'isAdmin':user['isAdmin']}
    else:
        return None

def register(username, password, email):

    db = get_db()
    password_hashed = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    with db.cursor() as cursor:
        user_uuid = str(uuid.uuid4())
        try:
            cursor.execute("""INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID)
                            VALUES (%s, %s, %s, %s, %s)""", (username, password_hashed, email, False, user_uuid))
        except pymysql.err.IntegrityError:
            return {'error': 'Invalid user'}

        db.commit()

        return authenticate(username, password)

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'UUID' not in session.keys():
            return Response('Access Denied', 401)
        return f(*args, **kwargs)
    return wrapper

def is_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'isAdmin' not in session.keys() or not session['isAdmin']:
            return Response('Access Denied', 401)
        return f(*args, **kwargs)
    return wrapper