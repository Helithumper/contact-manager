# Backend with Flask

## Endpoints

`POST /login`

- Replies with a session cookie

`POST /logout`

- Deauths the session cookie

`GET /api/users`

- Probably not needed

`GET /api/users/<uuid:str>`

- Get all data about a specified user

`PUT /api/users`

- Create a user

`GET /api/contacts/<uuid:str>`

- Get specified contacts (all if none specified)

`PUT /api/contacts`

- Create a new contact

`DELETE /api/contacts/<uuid:str>`

- Delete a specified contact (Actually just marks as unactive in DB)

`PATCH /api/contacts/<uuid:str>`

- Update a specified contact
