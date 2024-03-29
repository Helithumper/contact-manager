from flask import Flask, jsonify, request, session, redirect
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
    return redirect('https://contacts.ucf.wtf/', code=302)

@app.route('/api/v1/register', methods = ['POST'])
def register():
    user_response = users.register(request.form['username'],
                          request.form['password'],
                          request.form['email'],
                          request.form['firstName'],
                          request.form['lastName'])

    return user_response

@app.route('/api/v1/login/check', methods = ['GET'])
def loginCheck():
    """Used to check if a user's cookie is still valid
    """
    try:
        if 'UUID' in session.keys():
            return 'success', 200
        else:
            return 'forbidden', 403
    except:
        return 'forbidden', 403

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
    return jsonify(contacts.get_user_contacts(session['UUID']))

@app.route('/api/v1/contacts/<uuid>', methods = ['GET', 'DELETE', 'PATCH'])
@users.login_required
def contacts_endpoint(uuid):
    """Modify contacts"""
    user_uuid = session['UUID']
    if request.method == 'GET':
        return jsonify(contacts.get_specified_contact(uuid, user_uuid))
    elif request.method == 'DELETE':
        return jsonify(contacts.delete_contact(uuid, user_uuid))
    elif request.method == 'PATCH':
        return contacts.update(uuid, user_uuid, json.loads(request.data))
    else:
        return "Method Undefined"

@app.route('/api/v1/contacts', methods = ['PUT'])
@users.login_required
def create_contact():
    return contacts.create_contact(json.loads(request.data), session['UUID'])

def create_app(running_config=config.BaseConfig):
    app.config.from_object(running_config)

    from database import init_app
    init_app(app)

    app.secret_key = running_config.SECRET_KEY
    return app

if __name__ == "__main__":
    app = create_app(running_config=config.TestingConfig)
    app.run(host='0.0.0.0', port=5000)
