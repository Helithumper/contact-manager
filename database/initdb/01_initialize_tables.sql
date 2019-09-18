/*
   NEEDED TABLES:
   -------------
   1.) Contacts
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
   2.) Users
        - ID (Integer, Primary Key)
        - Username (String)
        - Password (String Hash)
        - Email Address (String)
        - image_path (String)
*/

CREATE TABLE Users (
     id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
     Username varchar(255) NOT NULL UNIQUE,
     Password varchar(255) NOT NULL,
     EmailAddress varchar(255) NOT NULL UNIQUE,
     isAdmin BOOLEAN NOT NULL,
     UUID varchar(255) NOT NULL UNIQUE,
     AvatarPath varchar(255),
     PRIMARY KEY (id)
);

CREATE TABLE Contacts (
    id int(11) NOT NULL AUTO_INCREMENT UNIQUE,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    PhoneNumber varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    StreetAddress varchar(255) NOT NULL,
    City varchar(255) NOT NULL,
    StateName varchar(255) NOT NULL,
    ZipCode varchar(255) NOT NULL,
    Birthday varchar(255) NOT NULL,
    UUID varchar(255) NOT NULL UNIQUE, 
    UserID int(11) NOT NULL,
    FOREIGN KEY(UserID) REFERENCES Users (id),
    PRIMARY KEY (id)
);