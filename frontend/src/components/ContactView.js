import React, { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';

const ContactView = (props) => {
    const {FirstName, LastName, Birthday, StreetAddress, City, 
        StateName, PhoneNumber, Email, ZipCode, UUID, updateContactDetails, 
        saveContactUpdate} = props;
    const [isEditable, setIsEditable] = useState(false);

    const handleEditClick = () => {
        if(isEditable === false)
        {
            // We now allow edits
            setIsEditable(true);
        }
        else
        {
            // We need to save the edits
            setIsEditable(false);
            saveContactUpdate();
        }
    }

    const handleChange = name => event => {
        updateContactDetails(name, event.target.value)
    }

    return(
        <Paper>
            <TextField variant='outlined'
            label='First Name'
            value={FirstName}
            disabled={isEditable === false}
            onChange={handleChange('FirstName')}
            />
            <TextField variant='outlined'
            label='Last Name'
            value={LastName}
            disabled={isEditable === false}
            onChange={handleChange('LastName')}
            />
            <TextField variant='outlined'
            label='Phone Number'
            value={PhoneNumber}
            disabled={isEditable === false}
            onChange={handleChange('PhoneNumber')}
            />
            <TextField variant='outlined'
            label='Email'
            value={Email}
            disabled={isEditable === false}
            onChange={handleChange('Email')}
            />
            <TextField variant='outlined'
            label='Street Address'
            value={StreetAddress}
            disabled={isEditable === false}
            onChange={handleChange('StreetAddress')}
            />
            <TextField variant='outlined'
            label='City'
            value={City}
            disabled={isEditable === false}
            onChange={handleChange('City')}
            />
            <TextField variant='outlined'
            label='State'
            value={StateName}
            disabled={isEditable === false}
            onChange={handleChange('StateName')}
            />
            <TextField variant='outlined'
            label='Zip Code'
            value={ZipCode}
            disabled={isEditable === false}
            onChange={handleChange('ZipCode')}
            />
            <TextField variant='outlined'
            label='Birthday'
            value={Birthday}
            disabled={isEditable === false}
            onChange={handleChange('Birthday')}
            />
            <Button variant='primary'
            onClick={handleEditClick}
            >{isEditable === false ? 'Edit' : 'Save' }</Button>
            {isEditable ? <Button variant='primary'>Delete</Button> : ''}
        </Paper>
    );
}

export default ContactView;