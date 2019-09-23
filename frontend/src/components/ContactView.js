import React, { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';

const ContactView = (props) => {
    const {FirstName, LastName, Birthday, StreetAddress, City, 
        StateName, PhoneNumber, Email, ZipCode, UUID, updateContactDetails, 
        saveContactUpdate, deleteContact, clearContactDetails, isEditable,
        setIsEditable, isDeletable, setIsDeletable, isAdding, setIsAdding, createContact} = props;

    const handleEditClick = () => {
        if(isEditable === false)
        {
            // We now allow edits
            setIsEditable(true);
            setIsDeletable(true);
        }
        else
        {
            // We need to save the edits
            setIsEditable(false);
            setIsDeletable(false);
            saveContactUpdate();
        }
    }

    const handleChange = name => event => {
        updateContactDetails(name, event.target.value)
    }

    const handleDeleteClick = () => {
        setIsEditable(false);
        setIsDeletable(false);
        deleteContact();
        clearContactDetails();
    }

    const handleAddClick = () => {
        setIsEditable(false);
        setIsDeletable(false);
        setIsAdding(false);
        createContact();
        clearContactDetails();
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
            {isAdding ? '' : <Button variant='outlined'
            onClick={handleEditClick}
            >{isEditable ? 'Save' : 'Edit' }</Button>}
            {isDeletable && !isAdding ? <Button variant='outlined'
                onClick={handleDeleteClick}>Delete</Button> : ''}
            {isAdding ? <Button variant='outlined' onClick={handleAddClick}>Add</Button> : ''}
        </Paper>
    );
}

export default ContactView;