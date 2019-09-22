import React, { useState } from 'react';
import { Paper, TextField } from '@material-ui/core';

const ContactView = (props) => {
    const {selectedContact} = props;
    const [isEditable, setIsEditable] = useState(false);

    return(
        <Paper>
            <TextField variant='outlined'
            label='First Name'
            value={selectedContact.FirstName}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='Last Name'
            value={selectedContact.LastName}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='Phone Number'
            value={selectedContact.PhoneNumber}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='Email'
            value={selectedContact.Email}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='Street Address'
            value={selectedContact.StreetAddress}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='City'
            value={selectedContact.City}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='State'
            value={selectedContact.StateName}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='Zip Code'
            value={selectedContact.ZipCode}
            disabled={!isEditable}
            />
            <TextField variant='outlined'
            label='Birthday'
            value={selectedContact.Birthday}
            disabled={!isEditable}
            />
        </Paper>
    );
}

export default ContactView;