import React from 'react';
import axios from 'axios';
import ContactView from '../components/ContactView';
import { Paper, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ContactsList from '../components/ContactsList';
import Search from '../components/Search';

const contactsURL = '/api/v1/contacts';
const checkLoginURL = '/api/v1/login/check';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            visibleContacts: [],
            searchTerm: '',
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
            selectedContactUUID : '',
            isEditable: false,
            isDeletable: false,
            isAdding: false
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
                contacts: response.data,
                visibleContacts: response.data
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

        const setIsEditable = (val) => {
            this.setState({isEditable: val})
        }

        const setIsDeletable = (val) => {
            this.setState({isDeletable: val})
        }
        
        const setIsAdding = (val) => {
            this.setState({isAdding: val})
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
                }, () => {search()});
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

        const createContact = () => {
            axios({
                method: 'PUT',
                url: `${contactsURL}`,
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
                getAllContacts();
                console.log(response);
            })
            .catch(response => {
                console.log(response);
                this.setState({errorMessage: 'Oops, something went wrong while creating contact.'})
            })
        }

        const clearContactDetails = () => {
            this.setState({
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
                selectedContactUUID: ''
            });
            setSearchTerm('');
        }

        const handleNewContactClick = () => {
            clearContactDetails();
            setIsEditable(true);
            setIsAdding(true);
        }

        const setSearchTerm = (term) => {
            this.setState({searchTerm: term});
            search();
        }

        const search = () => {
            this.setState({visibleContacts: []}, () => {
                let tempContacts = [];
                if(this.state.searchTerm === '')
                    tempContacts = [...this.state.contacts];
                else
                    this.state.contacts.map(contact => {
                        if((contact.FirstName + contact.LastName).toUpperCase().search(this.state.searchTerm.replace(/\s/g, '').toUpperCase()) !== -1)
                            tempContacts.push(contact);
                    });
                this.setState({visibleContacts: [...tempContacts]});
            });
        }

        return (
            <div>
            <Search {...this.state} setSearchTerm={setSearchTerm}/>
            <Paper>
            <Button
                onClick={handleNewContactClick}>
                <AddIcon/>
            </Button>
                <ContactsList {...this.state}
                selectedContactUUID={this.state.selectedContactUUID}
                setSelectedContactUUID={setSelectedContactUUID}
                getContactDetails={getContactDetails}
                setIsEditable={setIsEditable} setIsDeletable={setIsDeletable}
                setIsAdding={setIsAdding}/>
            </Paper>
            <ContactView {...this.state}
                updateContactDetails={updateContactDetails}
                saveContactUpdate={saveContactUpdate}
                deleteContact={deleteContact}
                clearContactDetails={clearContactDetails}
                setIsEditable={setIsEditable}
                setIsDeletable={setIsDeletable}
                setIsAdding={setIsAdding}
                createContact={createContact}/>
            </div>
        )
    }
}

export default Home;
