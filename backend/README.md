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

## Data Structures

### User

```json
{
    id: 'uuid',
    first_name: 'firstname',
    last_name: 'lastname',
    date_created: datetime
}
```

### Contact

```json
{
    id: 'uuid',
    first_name: 'firstname',
    last_name: 'lastname',
    date_created: datetime,
    email_address: 'email',
    phone_number: '1234567890',
}
```