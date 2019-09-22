import React from 'react';
import ContactsListPane from './ContactsListPane';
import axios from 'axios';
import ContactView from '../components/ContactView';

const getContactsURL = '/api/v1/contacts';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            selectedContactUUID: '',
            selectedContact: {
                'FirstName': 'Jaiden',
                'LastName': 'Couch',
                'PhoneNumber': '4071234567',
                'Email': 'Jaiden@ucf.edu',
                'StreetAddress': '123 Knight way',
                'City': 'Orlando',
                'StateName': 'Florida',
                'ZipCode': '32817',
                'Birthday': '04/27/1995',
                'UUID': 'f3c72950-5e97-4387-8383-ae8a383c3ddd',
                'UserID': 1
            },
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
            }, getContactDetails);
        }

        const getContactDetails = () => {
            axios({
                method: 'GET',
                url: getContactsURL,
                params: {
                    uuid: this.state.selectedContactUUID
                }
            })
            .then(response => {
                this.setState({
                    selectedContact: response.data
                })
                console.log(response);
            })
            .catch(response => {
                this.setState({
                    errorMessage: 'Oops. Something bad happened.'
                })
            })
        }

        return (
            <div>
            <ContactsListPane contacts={this.state.contacts}
                selectedContactUUID={this.state.selectedContactUUID}
                setSelectedContactUUID={setSelectedContactUUID}
                getContactDetails={getContactDetails}/>
            <ContactView selectedContact={this.state.selectedContact}/>
            </div>
        )
    }
}

export default Home;