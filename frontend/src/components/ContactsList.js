import React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';

const ContactsList = (props) => {
    const {selectedContactUUID, setSelectedContactUUID, getContactDetails, 
        setIsEditable, setIsDeletable, setIsAdding, visibleContacts} = props;

    const handleListClick = (event, uuid) => {
        setIsEditable(false);
        setIsDeletable(false);
        setIsAdding(false);
        setSelectedContactUUID(uuid);
    }
    return(
        <List style={{overflow: 'auto', maxHeight: '180px'}}>
            {visibleContacts.map(value => {
                return(
                    <ListItem button 
                        selected={value.UUID === selectedContactUUID}
                        onClick={event => handleListClick(event, value.UUID)}
                        key={value.UUID}>
                        <ListItemText primary={`${value.FirstName} ${value.LastName}`}/>
                    </ListItem>
                );
            })}
        </List>
    );
};
export default ContactsList;