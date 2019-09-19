import React from 'react';
import List, { ListItem, ListItemText } from '@material-ui/core';

const ContactsList = (props) => {
    const contacts = ["Fred", "Abigail", "Josh"]
    return(
        <List>
            contacts.map(value => (
                <ListItem>
                    <ListItemText
                        primary={value}/>
                </ListItem>))
        </List>
    );
};
export default ContactsList;