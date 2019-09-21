import React from 'react';
import ContactsListPane from './ContactsListPane';
import axios from 'axios';

const getContactsURL = '/api/v1/contacts';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            selectedContactUUID: '',
            errorMessage: ''
        }
    }
    

    componentDidMount() {
        axios({
            method: 'GET',
            url: getContactsURL
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                contacts: response.data
            });
        })
        .catch(response => {
            this.setState({
                errorMessage: 'Oops. Something has gone wrong.'
            })
        });
    }

    render() {
        const setSelectedContactUUID = (uuid) => {
            this.setState({
                selectedContactUUID: uuid
            });
        }

        return (
            <ContactsListPane contacts={this.state.contacts}
                setSelectedContactUUID={setSelectedContactUUID}/>
        )
    }
}

export default Home;