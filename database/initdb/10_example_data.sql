/*
    This is where we would add SQL insert commands
    to insert fake data for our application
*/
INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID, AvatarPath) Values ('peyton','$2a$12$yEZM202oh8DWaB9I/DL.2OoNbCzUbeZfFL66WADnXQR6Ijizyl0Lq','pduncan@hackucf.org', TRUE, 'aab8d2fd-5f4f-408c-aff8-a69936e6283b', 'test.png');
INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID, AvatarPath) Values ('test','$2a$12$yEZM202oh8DWaB9I/DL.2OoNbCzUbeZfFL66WADnXQR6Ijizyl0Lq','orsonh@gmail.com',TRUE, 'adf95622-1247-4380-98ff-8d72a00a9d3b', 'test.png');
INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID, AvatarPath) Values ('admin','$2a$12$yEZM202oh8DWaB9I/DL.2OoNbCzUbeZfFL66WADnXQR6Ijizyl0Lq','admin@gmail.com',TRUE, '6d49b363-da9b-4a9a-90a5-1a1ba830fccd', 'test.png');
INSERT INTO Users (Username, Password, EmailAddress, isAdmin, UUID, AvatarPath) Values ('regular','$2a$12$yEZM202oh8DWaB9I/DL.2OoNbCzUbeZfFL66WADnXQR6Ijizyl0Lq','regular@gmail.com',FALSE, '604dcdd66-836e-4cd1-b64e-9233fdc95b5', 'test.png');

INSERT INTO Contacts (FirstName, LastName, UUID, UserID) Values ('Jaiden','Couch','f3c72950-5e97-4387-8383-ae8a383c3ddd', 1);
INSERT INTO Contacts (FirstName, LastName, UUID, UserID) Values ('Katrina','Humphreys','931399f2-84e9-4547-bfaf-76582a2f7d48',1);
INSERT INTO Contacts (FirstName, LastName, UUID, UserID) Values ('Yahya','Kouma','1f298dce-fcc0-4dbb-9969-ab840cf0daa2',1);
INSERT INTO Contacts (FirstName, LastName, UUID, UserID) Values ('Vladimir','Melton','0df46186-a4b2-47ff-8a7c-a10bf3891086',2);
INSERT INTO Contacts (FirstName, LastName, UUID, UserID) Values ('Enzo','Horn','414b95c6-6f2e-4687-b764-7f056310aac5',2);
INSERT INTO Contacts (FirstName, LastName, UUID, UserID) Values ('Colby','Kearney','7c54aea9-7036-46f3-8962-49d905182526',2);
