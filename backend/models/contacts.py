from database import get_db
from flask import make_response
import json

DB_FIELDS_NONSTATIC = ['FirstName','LastName']

def get_all_contacts():
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute('SELECT Contacts.FirstName, Contacts.LastName, UUID FROM Contacts')
        contacts = cursor.fetchall()
        
    return contacts

def get_user_contacts(userUUID):
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute("""SELECT Contacts.FirstName, Contacts.LastName, Contacts.UUID 
                          FROM Contacts
                          INNER JOIN Users
                          ON Contacts.UserID=Users.id
                          WHERE Users.UUID=%s""", (userUUID))
        contacts = cursor.fetchall()
    return contacts

def delete_contact(UUID, userUUID):
    """
    Delete a UUID, but only if it is owned by the specified user
    or the user is an admin
    """
    return ""

def update(contactUUID, userUUID, changes):
    """Updates user with id uuid with their corresponding changes"""
    users_contacts = get_user_contacts(userUUID)
    
    # If there are no contacts, they can't update anything...
    if len(users_contacts) == 0:
        return make_response('contact not found',404)
        
    # Check to ensure the contactUUID exists for this user
    contact = next(filter(lambda x: x['UUID'] == contactUUID, users_contacts))
    if contact is None:
        return make_response('contact not found',404)
    
    # Ensure field names are valid for processing
    for field in changes.keys():
        if field not in DB_FIELDS_NONSTATIC:
            return make_response(json.dumps({'error': f'Field name invalid: {field}'}), 422)

    # Since we now know all fields are valid, put together the query
    query = "UPDATE Contacts SET "
    for field in changes.keys():
        query += f"{field} = '{changes[field]}', "
    query = query[:-2]
    query += " WHERE Contacts.UUID=%s"

    # Make the change in the database
    db = get_db()
    with db.cursor() as cursor:
        cursor.execute(query, (contactUUID))
    db.commit()

    return make_response('success', 200)