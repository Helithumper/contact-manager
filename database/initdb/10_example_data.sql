/*
    This is where we would add SQL insert commands
    to insert fake data for our application
*/
INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID, AvatarPath) Values ('peyton','$2a$12$yEZM202oh8DWaB9I/DL.2OoNbCzUbeZfFL66WADnXQR6Ijizyl0Lq','pduncan@hackucf.org', true, 'aab8d2fd-5f4f-408c-aff8-a69936e6283b', 'test.png');
INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID, AvatarPath) Values ('test','$2a$12$yEZM202oh8DWaB9I/DL.2OoNbCzUbeZfFL66WADnXQR6Ijizyl0Lq','orsonh@gmail.com',true, 'adf95622-1247-4380-98ff-8d72a00a9d3b', 'test.png');

INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, StreetAddress, City, StateName, ZipCode, Birthday, UUID, UserID) Values ('Jaiden','Couch','4071234567', 'Jaiden@ucf.edu','123 Knight way', 'Orlando', 'Florida', '32817', '04/27/1995', 'f3c72950-5e97-4387-8383-ae8a383c3ddd', 1);
INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, StreetAddress, City, StateName, ZipCode, Birthday, UUID, UserID) Values ('Katrina','Humphreys','4072222222', 'Katrina@ucf.edu', '225 Silver Rd', 'Orlando', 'Florida', '32807', '03/22/1998', '931399f2-84e9-4547-bfaf-76582a2f7d48',1);
INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, StreetAddress, City, StateName, ZipCode, Birthday, UUID, UserID) Values ('Yahya','Kouma','5619221234', 'Yahya@ucf.edu','321 Pegasus way','Orlando','Florida','32811','09/09/2000','1f298dce-fcc0-4dbb-9969-ab840cf0daa2',1);
INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, StreetAddress, City, StateName, ZipCode, Birthday, UUID, UserID) Values ('Vladimir','Melton','3218762345','Vladimir.Melton@ucf.edu','410 Ucf Dr.','Orlando','Florida','32819','06/12/1999','0df46186-a4b2-47ff-8a7c-a10bf3891086',2);
INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, StreetAddress, City, StateName, ZipCode, Birthday, UUID, UserID) Values ('Enzo','Horn','4078991234','EnzoHorn@ucf.edu','1989 hack st','Winter Park','Florida','32813','10/31/1990','414b95c6-6f2e-4687-b764-7f056310aac5',2);
INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, StreetAddress, City, StateName, ZipCode, Birthday, UUID, UserID) Values ('Colby','Kearney','5613214070','Colby.Kearney@ucf.edu','2019 poos way','Oviedo','Florida','32819','05/29/1978','7c54aea9-7036-46f3-8962-49d905182526',2);
