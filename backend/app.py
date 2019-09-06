from flask import Flask, jsonify

import contacts
import config

app = Flask(__name__)

@app.route('/login', methods = ['POST'])
def login():
    """Replies with a session cookie"""
    return "login"


@app.route('/logout', methods = ['GET'])
def logout():
    """Deauths the session cookie"""
    return "logged out"

@app.route('/api/users', methods = ['PUT', 'PATCH'])
def users_put():
    """Creates a User"""
    if request.method == 'PUT':
        return "Create User"
    elif request.method == 'PATCH':
        return "Update User"
    else:
        return "Method Undefined"

@app.route('/api/users/<uuid:str>', methods = ['GET'])
def users_specific(uuid):
    """Get all data about a specified user"""
    return str(uuid)

@app.route('/api/contacts', methods = ['GET'])
def contacts_get():
    """Gets current user's contacts"""
    return jsonify(contacts.get_all_contacts())

@app.route('/api/contacts/<uuid:str>', methods = ['GET', 'DELETE', 'PATCH'])
def contacts_endpoint(uuid):
    """Modify contacts"""
    if request.method == 'GET':
        return "Specific Contact"
    elif request.method == 'DELETE':
        return "Delete Contact"
    elif request.method == 'PATCH':
        return "Patch Contact"
    else:
        return "Method Undefined"

@app.route('/api/contacts', methods = ['PUT'])
def create_contact():
    """Create a new contact"""
    return "New Contact"


if __name__ == '__main__':
    app.config.from_object('config.DevelopmentConfig')

    from database import init_app
    init_app(app)

    app.run(host='0.0.0.0', port=5000)