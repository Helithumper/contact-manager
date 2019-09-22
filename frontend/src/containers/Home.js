import React from 'react';
import ContactsListPane from './ContactsListPane';
import axios from 'axios';
import ContactView from '../components/ContactView';

const contactsURL = '/api/v1/contacts';
const checkLoginURL = '/api/v1/login/check';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            UUID: '',
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Email: '',
            StreetAddress: '',
            City: '',
            StateName: '',
            ZipCode: '',
            Birthday: '',
            errorMessage: '',
            selectedContactUUID : ''
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
            url: contactsURL
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
                url: contactsURL+"/"+this.state.selectedContactUUID
            })
            .then(response => {
                this.setState({
                    FirstName: response.data.FirstName,
                    LastName: response.data.LastName,
                    PhoneNumber: response.data.PhoneNumber,
                    Email: response.data.Email,
                    StreetAddress: response.data.StreetAddress,
                    City: response.data.City,
                    StateName: response.data.StateName,
                    ZipCode: response.data.ZipCode,
                    Birthday: response.data.Birthday,
                    UUID: response.data.UUID,
                })
                console.log(response);
            })
            .catch(response => {
                this.setState({
                    errorMessage: 'Oops. Something bad happened.'
                })
            })
        }

        const updateContactDetails = (field, newValue) => {
            this.setState({[field] : newValue})
        };

        const getAllContacts = () => {
            // Get all their contacts
            axios({
                method: 'GET',
                url: contactsURL
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

        const saveContactUpdate = () => {
            axios({
                method: 'PATCH',
                url: contactsURL+`/${this.state.selectedContactUUID}`,
                data: {
                    FirstName : this.state.FirstName,
                    LastName: this.state.LastName,
                    Email : this.state.Email,
                    PhoneNumber : this.state.PhoneNumber,
                    StreetAddress : this.state.StreetAddress,
                    City : this.state.City,
                    StateName : this.state.StateName,
                    ZipCode : this.state.ZipCode,
                    Birthday : this.state.Birthday
                }
            })
            .then(response => {
                console.log(response);
                getAllContacts();
            })
            .catch(response => {
                this.setState({errorMessage : 'Oops. Something went wrong.'})
            })
        }

        const deleteContact = () => {
            axios({
                method: 'DELETE',
                url: `${contactsURL}/${this.state.selectedContactUUID}`
            })
            .then(response => {
                console.log(response);
                getAllContacts();
            })
            .catch(response => {
                this.setState({errorMessage : 'Oops. Something went wrong.'})
            })
        }

        return (
            <div>
            <ContactsListPane contacts={this.state.contacts}
                selectedContactUUID={this.state.selectedContactUUID}
                setSelectedContactUUID={setSelectedContactUUID}
                getContactDetails={getContactDetails}/>
            <ContactView {...this.state}
                updateContactDetails={updateContactDetails}
                saveContactUpdate={saveContactUpdate}
                deleteContact={deleteContact}/>
            </div>
        )
    }
}

export default Home;