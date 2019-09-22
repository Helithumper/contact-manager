from database import get_db
from flask import session, make_response
import json
from validate_email import validate_email
from functools import wraps
import pymysql
import bcrypt
import uuid

DB_FIELDS_NONSTATIC = ['Username','Password','isAdmin','AvatarPath']

def authenticate(username, password):
    """Authenticate users, return user information"""

    # Ensure all fields are non-empty
    for field in [username, password]:
        if not (field and field != "" and isinstance(field, str)):
            return None

        
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute("""SELECT Users.Username, Users.Password, Users.UUID, Users.isAdmin
                          FROM Users where Users.Username=%s""",(username))
        user = cursor.fetchone()
    
    if user and bcrypt.checkpw(password.encode('utf8'), user['Password'].encode('utf8')):
        return {'UUID':user['UUID'], 'isAdmin':user['isAdmin']}
    else:
        return None

def register(username, password, email, firstName, lastName):
    """Register new users"""
    db = get_db()

    # Ensure all fields are non-empty
    for field in [username, password, email]:
        if not (field and field != "" and isinstance(field, str)):
            return make_response({'error': 'Invalid Input'}, 422)

    # Ensure email address is a valid email address
    if not validate_email(email):
        return make_response({'error': 'Invalid Email Address'}, 422)

    password_hashed = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

    with db.cursor() as cursor:
        user_uuid = str(uuid.uuid4())
        try:
            cursor.execute("""INSERT INTO Users (Users.Username, Users.FirstName, Users.LastName, Users.Password, Users.EmailAddress, Users.isAdmin, Users.UUID)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)""", (username, firstName, lastName, password_hashed, email, False, user_uuid))
        except pymysql.err.IntegrityError:
            return make_response({'error': 'Invalid user'},200)

        db.commit()

        return make_response(authenticate(username, password),200)

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
            return make_response(json.dumps({'error': f'Field name invalid: {field}'}), 422)

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

    return make_response('success',200)


def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'UUID' not in session.keys():
            return make_response('Access Denied', 401)
        return f(*args, **kwargs)
    return wrapper

def is_admin(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if 'isAdmin' not in session.keys() or not session['isAdmin']:
            return make_response('Access Denied', 401)
        return f(*args, **kwargs)
    return wrapper