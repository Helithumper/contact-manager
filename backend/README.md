# Backend with Flask

## Endpoints

`POST /api/v1/login`

- Replies with a session cookie

`GET /api/v1/logout`

- Deauths the session cookie

`GET /api/v1/users`

- Only works for admins
- Get all users

`PATCH /api/v1/users/<uuid:str>`

- Update information about the current user.

`POST /api/v1/register`

- Create a user

`GET /api/v1/contacts`

- Gets the current user's contacts (based on session)

`GET /api/v1/contacts/<uuid:str>`

- Get specified contacts

`DELETE /api/v1/contacts/<uuid:str>`

- Delete specified contact

`PATCH /api/v1/contacts/<uuid:str>`

- Update specified contact

`PUT /api/v1/contacts`

- Create a new contact belonging to the user who this is created by
