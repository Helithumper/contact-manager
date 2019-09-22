import React from 'react';
import { Paper, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ContactsList from '../components/ContactsList';

const ContactsListPane = (props) => {
    return(
        <Paper>
            <Button>
                <AddIcon/>
            </Button>
            <ContactsList {...props}/>
        </Paper>
    );
};
export default ContactsListPane;