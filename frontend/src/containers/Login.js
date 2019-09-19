import React from 'react';
import {useState} from 'react';
import {Container, Typography, TextField, Button, Box} from '@material-ui/core';

let Login = (props) => {
    let url = '/api/v1/login';
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [uuid, setUuid] = useState('');
    const [sessionKey, setSessionKey] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    let signIn = (data = {}) => {
        console.log(url);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => {res.json(); console.log(res)})
        .then(result => {
            setLoginSuccess(result.success);
            if(result.success) {
                setUsername(result.username);
                setUuid(result.uuid);
                setSessionKey(result.sessionKey);
            }
        }, (error) => {
            console.log(error);
        });
        console.log(username);
    }

    return (
        <React.Fragment>
            <Container fixed>
                <Typography>
                    Contacts!
                </Typography>
                <form>
                    <TextField
                        id='username-input'
                        label='Username'
                        variant='outlined'
                        value={props.values.username}
                        onChange={e => {props.handleChange('username', e.target.value)}}/>
                    <TextField
                        id='password-input'
                        label='Password'
                        type='password'
                        variant='outlined'
                        onChange={e => {props.handleChange('password', e.target.value)}}/>
                    <Button variant='contained' color='primary' onClick={signIn}>Sign In</Button>
                    <Button variant='contained' color='secondary' onClick={signIn}>Sign Up</Button>
                </form>
                {(loginSuccess === '' || loginSuccess === true) ? '' : <Typography>Incorrect Sign In</Typography>}
            </Container>
        </React.Fragment>
    )
}

export default Login;