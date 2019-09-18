from flask import Flask, jsonify, request, session
import json

from models import users, contacts
import config

app = Flask(__name__)

@app.route('/api/v1/login', methods = ['POST'])
def login():
    """Replies with a session cookie"""
    user = users.authenticate(request.form['username'], request.form['password'])
    if(user):
        session['username'] = request.form['username']
        session['UUID'] = user['UUID']
        session['isAdmin'] = user['isAdmin']
        return "Logged In"
    else:
        return "Authentication Failed", 401


@app.route('/api/v1/logout', methods = ['GET'])
def logout():
    """Deauths the session cookie"""
    username = session.pop('username',None)
    session.pop('UUID',None)
    session.pop('isAdmin',None)
    return username or ""

@app.route('/register', methods = ['POST'])
def register():
    user_response = users.register(request.form['username'],
                          request.form['password'],
                          request.form['email'])

    return user_response

@app.route('/api/v1/users/<uuid>', methods = ['PATCH'])
@users.login_required
def users_patch(uuid):
    """Update User fields
    """
    return users.update(uuid, json.loads(request.data))

@app.route('/api/v1/users', methods = ['GET'])
@users.login_required
@users.is_admin
def all_users():
    """Get data about all users"""
    return jsonify(users.get_users())

@app.route('/api/v1/contacts', methods = ['GET'])
@users.login_required
def contacts_get():
    """Gets current user's contacts"""
    # return jsonify(contacts.get_all_contacts())
    return jsonify(contacts.get_user_contacts(session['UUID']))

@app.route('/api/v1/contacts/<uuid>', methods = ['GET', 'DELETE', 'PATCH'])
@users.login_required
def contacts_endpoint(uuid):
    """Modify contacts"""
    if request.method == 'GET':
        return jsonify(contacts.get_user_contacts(uuid))
    elif request.method == 'DELETE':
        #TODO: Delete Contacts
        user_uuid = session['UUID']
        return jsonify(contacts.delete_contact(uuid, user_uuid))
        return "Delete Contact"
    elif request.method == 'PATCH':
        return contacts.update(uuid, session['UUID'], json.loads(request.data))
    else:
        return "Method Undefined"

@app.route('/api/v1/contacts', methods = ['PUT'])
@users.login_required
def create_contact():
    """Create a new contact"""
    #TODO: Create Contacts
    return "New Contact"


def create_app(running_config=config.DevelopmentConfig):
    app.config.from_object(running_config)

    from database import init_app
    init_app(app)

    app.secret_key = b'1234j1p23j41p2i3h4ocugc1kj23c4sdfASDFA12cv3'

    return app
    # app.run(host='0.0.0.0', port=5000)

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000)