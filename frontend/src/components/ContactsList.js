import React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';

const ContactsList = (props) => {
    const contacts = ["Fred", "Abigail", "Josh"]
    return(
        <List>
            contacts.map((value) => (
                <ListItem>
                    {/* <ListItemText
                        primary={value}/> */}
                </ListItem>))
        </List>
    );
};
export default ContactsList;