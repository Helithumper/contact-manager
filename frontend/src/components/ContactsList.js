import React from 'react';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';

const ContactsList = (props) => {
    const {contacts, setSelectedContactUUID} = props;
    const [selectedUUID, setSelectedUUID] = React.useState('');

    const handleListClick = (event, uuid) => {
        setSelectedUUID(uuid);
        setSelectedContactUUID(uuid);
    }
    return(
        <List>
            {contacts.map(value => {
                return(
                    <ListItem button 
                        selected={value.UUID === selectedUUID}
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