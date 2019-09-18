import React from 'react';
import {useState} from 'react';
import {Container, Typography, TextField, Button, Box} from '@material-ui/core';

let Login = (props) => {
    let url = process.env.NODE_ENV === 'development' ? '../test/mock/' : 'https://ucf.wtf/api/'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [uuid, setUuid] = useState('');
    const [sessionKey, setSessionKey] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    let signIn = () => {
        let loginUrl = process.env.NODE_ENV === 'development' ? 'login.json' : 'login';
        console.log(loginUrl);
        fetch(url+loginUrl)
        .then(res => {console.log(res); res.json()})
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
                        value={username}
                        onChange={e => setUsername(e.target.value)}/>
                    <TextField
                        id='password-input'
                        label='Password'
                        type='password'
                        variant='outlined'
                        onChange={e => setPassword(e.target.value)}/>
                    <Button variant='contained' color='primary' onClick={signIn}>Sign In</Button>
                    <Button variant='contained' color='secondary' onClick={signIn}>Sign Up</Button>
                </form>
                {(loginSuccess === '' || loginSuccess === true) ? '' : <Typography>Incorrect Sign In</Typography>}
            </Container>
        </React.Fragment>
    )
}

export default Login;