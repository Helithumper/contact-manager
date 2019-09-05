/*
   NEEDED TABLES:
   -------------
   1.) contacts
        - ID (Integer, Primary Key)
        - Creation Date (Date)
        - First Name (String)
        - Last Name (String)
        - Email Address (String)
        - Phone Number (String)
        - Street Address (String)
        - City Name (String)
        - State Name (String)
        - Zip Code (String b/c Zip+4)
        - Birthday (MySQL Date)
   2.) users
        - ID (Integer, Primary Key)
        - Username (String)
        - Password (String Hash)
        - Email Address (String)
        - image_path (String)
   3.) users_contacts
        - id (Integer, Primary Key)
        - user_id (Integer, Foreign Key)
        - contact_id (Ingeger, Foreign Key)
*/