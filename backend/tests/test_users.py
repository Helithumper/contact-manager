from models import users
import pytest
import json

# Length of a standard UUID
UUID_LENGTH = 36

def test_pytest_operational():
    assert 1

def test_DB_FIELDS_NONSTATIC_set():
    nonstatic = users.DB_FIELDS_NONSTATIC
    assert len(nonstatic) > 0

@pytest.mark.parametrize(
    'username, password, email, status_code', [
        ('kanna','dragon','kanna@dragon.com', 200),
        ('','dragon','kanna@dragon.com', 422),
        ('kanna','','kanna@dragon.com', 422),
        ('kanna','dragon','', 422),
        ('','','', 422),
        ('kanna','dragon','kannadragon', 422)
    ]
)
def test_register_user(username, password, email, status_code, client):
    data = {
        'username': username,
        'password': password,
        'email': email
    }
    res = client.post('/register', data=data)
    assert res.status_code == status_code

@pytest.mark.parametrize(
    'username, password, status_code', [
        ('kanna','dragon',200),
        ('','',401),
        ('','dragon',401),
        ('kanna','',401),
        ('annak','dragon',401),
        ('kanna','car',401),
    ]
)
def test_login_user(username, password, status_code, client):
    data = {
        'username': username,
        'password': password
    }
    res = client.post('/login', data=data)
    assert res.status_code == status_code

    with client.session_transaction() as session:
        if status_code == 200:
            assert session['username'] == username
            assert session['isAdmin'] == False
            assert len(session['UUID']) == UUID_LENGTH
        else:
            assert list(session.keys()) == []

def test_logout_user(client):
    # Login as an admin
    data = {
        'username': 'regular',
        'password': 'password'
    }
    res = client.post('/login', data=data)
    assert res.status_code == 200

    # See if session is created
    with client.session_transaction() as session:
        assert session['username'] == 'regular'
        assert session['isAdmin'] == False
        assert len(session['UUID']) == UUID_LENGTH

    # Logout
    res = client.get('/logout')
    assert res.status_code == 200
    
    # Ensure session is gone
    with client.session_transaction() as session:
        assert list(session.keys()) == []

def test_get_all_users(client):
    data = {
        'username': 'admin',
        'password': 'password'
    }
    res = client.post('/login', data=data)
    assert res.status_code == 200 
    
    res = client.get('/api/users')
    assert res.status_code == 200

    assert res.text != ""
    json_doc = json.loads(res.text)

def test_get_specific_user():
    assert 1

def test_update_self_user():
    assert 1

def test_update_user_as_admin():
    assert 1

def test_authenticate_decorator():
    assert 1

def test_isadmin_decorator():
    assert 1