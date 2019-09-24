import React, { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        margin: '20px',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const ContactView = (props) => {
    const classes = useStyles();

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
        <div className={classes.container}>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='First Name'
                value={FirstName}
                disabled={isEditable === false}
                onChange={handleChange('FirstName')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='Last Name'
                value={LastName}
                disabled={isEditable === false}
                onChange={handleChange('LastName')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='Phone Number'
                value={PhoneNumber}
                disabled={isEditable === false}
                onChange={handleChange('PhoneNumber')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='Email'
                value={Email}
                disabled={isEditable === false}
                onChange={handleChange('Email')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='Street Address'
                value={StreetAddress}
                disabled={isEditable === false}
                onChange={handleChange('StreetAddress')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='City'
                value={City}
                disabled={isEditable === false}
                onChange={handleChange('City')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='State'
                value={StateName}
                disabled={isEditable === false}
                onChange={handleChange('StateName')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='Zip Code'
                value={ZipCode}
                disabled={isEditable === false}
                onChange={handleChange('ZipCode')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                <TextField variant='outlined'
                label='Birthday'
                value={Birthday}
                disabled={isEditable === false}
                onChange={handleChange('Birthday')}
                className={classes.root}
                />
            </div>
            <div className={classes.root}>
                {isAdding ? '' : <Button variant='outlined'
                onClick={handleEditClick}
                className={classes.root}
                >{isEditable ? 'Save' : 'Edit' }</Button>}
            </div>
            <div className={classes.root}>
            {isDeletable && !isAdding ? <Button variant='outlined'
                onClick={handleDeleteClick}
                className={classes.root}>Delete</Button> : ''}
            </div>
            <div className={classes.root}>
                {isAdding ? <Button variant='outlined' onClick={handleAddClick}
                className={classes.root}>Add</Button> : ''}
            </div>
        </div>
    );
}

export default ContactView;