import React from 'react'
import axios from 'axios';

const contact_url = '/api/v1/contacts'
axios.defaults.withCredentials = true

class Home extends React.Component {

    constructor(props){
        super()
        this.state = {'contacts': [], 'loading': true}

        this.componentDidMount = this.componentDidMount.bind(this)

    }
    componentDidMount(){
        this.setState({'loading': true}, () => {
            axios
            .get(contact_url)
            .then((res) => res.data)
            .then((res) => {
                this.setState({'contacts': res, 'loading': false})
            })
            .catch((err) => this.setState({'loading': false}))
        })
    }
    render() {
        if (this.state.loading) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <h1>{this.state.contacts.map((item) => 
                <li>{item.FirstName} {item.LastName}</li>
            )}</h1>
        )
    }
}

export default Home;