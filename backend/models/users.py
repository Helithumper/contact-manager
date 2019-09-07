from database import get_db
from flask import session, Response
import json
from functools import wraps
import pymysql
import bcrypt
import uuid

DB_FIELDS_NONSTATIC = ['Username','Password','isAdmin','AvatarPath']

def authenticate(username, password):
    """Authenticate users, return user information"""
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
    """Register new users"""
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

def get_users():
    """Enumerate users (admins only)"""
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute("SELECT Username, EmailAddress, isAdmin, UUID from Users")
        users = cursor.fetchall()

    return users

def get_user(uuid):
    """get a specific user"""
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute("SELECT Username, EmailAddress, isAdmin, UUID from Users where UUID=%s", (uuid))
        user = cursor.fetchone()
    
    return user

def update(uuid, changes):
    """Updates user with id uuid with their corresponding changes"""
    user = get_user(uuid)

    # Ensure field names are valid for processing
    for field in changes.keys():
        if field not in DB_FIELDS_NONSTATIC:
            return Response(json.dumps({'error': f'Field name invalid: {field}'}), 422)

    # Since we now know all fields are valid, put together the query
    query = "UPDATE Users SET "
    for field in changes.keys():
        query += f"{field} = '{changes[field]}', "
    query = query[:-2]
    query += " WHERE Users.UUID=%s"

    # Make the change in the database
    db = get_db()
    with db.cursor() as cursor:
        cursor.execute(query, (uuid))
    db.commit()

    return Response('success',200)


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