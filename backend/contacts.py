from database import get_db

def get_all_contacts():
    db = get_db()

    with db.cursor() as cursor:
        cursor.execute('SELECT * FROM Contacts')
        contacts = cursor.fetchall()
        
    return str(contacts)