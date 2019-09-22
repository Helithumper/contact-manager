import React from 'react';
import ContactsListPane from './ContactsListPane';
import axios from 'axios';
import ContactView from '../components/ContactView';

const getContactsURL = '/api/v1/contacts';
const checkLoginURL = '/api/v1/login/check';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            selectedContactUUID: '',
            selectedContact: {
                'FirstName': '',
                'LastName': '',
                'PhoneNumber': '',
                'Email': '',
                'StreetAddress': '',
                'City': '',
                'StateName': '',
                'ZipCode': '',
                'Birthday': '',
                'UUID': '',
            },
            errorMessage: ''
        }
    }
    

    componentDidMount() {
        // Check if the user is logged in

        axios({
            method: 'GET',
            url: checkLoginURL
        })
        .then(response => {
            console.log(response.status)
        })
        .catch(response => {
            window.location = '/login'
        })

        // Get all their contacts
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
                url: getContactsURL+"/"+this.state.selectedContactUUID
            })
            .then(response => {
                this.setState({
                    selectedContact: {
                        'FirstName': response.data.FirstName,
                        'LastName': response.data.LastName,
                        'PhoneNumber': response.data.PhoneNumber,
                        'Email': response.data.Email,
                        'StreetAddress': response.data.StreetAddress,
                        'City': response.data.City,
                        'StateName': response.data.StateName,
                        'ZipCode': response.data.ZipCode,
                        'Birthday': response.data.Birthday,
                        'UUID': response.data.UUID,
                    }
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