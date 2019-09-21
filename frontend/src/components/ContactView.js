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
        </Paper>
    );
}

export default ContactView;