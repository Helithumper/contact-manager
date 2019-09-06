from database import get_db

def get_all_contacts():
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute('SELECT FirstName, LastName, UUID FROM Contacts')
        contacts = cursor.fetchall()
        
    return contacts

def get_user_contacts(userUUID):
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute("""SELECT FirstName, LastName, Contacts.UUID 
                          FROM Contacts
                          INNER JOIN Users
                          ON Contacts.UserID=Users.id
                          WHERE Users.UUID=%s""", (userUUID))
        contacts = cursor.fetchall()
    return contacts