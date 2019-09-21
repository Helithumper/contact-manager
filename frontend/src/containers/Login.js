import React from 'react';
import { useState } from 'react';
import { Container, Typography, TextField, Button, Card, SnackbarContent } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '10%',
    },
    logo: {
        width: '75%',
    },
    fieldRow: {
        margin: '8',
    },
    button: {
        margin: '5%',
    }
})

const login_url = '/api/v1/login'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', errorMessage: '' };
        // this.classes = useStyles();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleErrorClose = this.handleErrorClose.bind(this);
    }

    handleErrorClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ 'errorMessage': '' });
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleRegister() {
        document.location = '/register'
    }

    handleSubmit(event) {
        let bodyFormData = new FormData();
        bodyFormData.append('username', this.state.username)
        bodyFormData.append('password', this.state.password)

        axios({
            method: 'POST',
            url: login_url,
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((response) => {
                Cookies.set('username', this.state.username)
                document.location = '/home'
            })
            .catch((response) => {
                this.setState({ 'errorMessage': 'Incorrect username or password.' })
            })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Container fixed>
                    <img id="logo" src="/logo.png" alt="Contacts!" className={classes.logo} />
                    <Card className={classes.root}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Sign in to your account
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                id='username'
                                label='Username'
                                variant='outlined'
                                margin="normal"
                                fullWidth
                                value={this.state.value}
                                onSubmit={this.handleSubmit}
                                className={classes.fieldRow}
                                onChange={e => { this.handleChange(e) }} />
                            <br />
                            <TextField
                                id='password'
                                label='Password'
                                type='password'
                                margin="normal"
                                fullWidth
                                variant='outlined'
                                value={this.state.value}
                                onSubmit={this.handleSubmit}
                                className={classes.fieldRow}
                                onSubmit={this.handleSubmit}
                                onChange={e => { this.handleChange(e) }} />
                            <br />
                            <Button
                                variant='contained'
                                color='primary'
                                size='large'
                                className={classes.button}
                                onClick={this.handleSubmit}>
                                Sign In
                        </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                size='large'
                                className={classes.button}
                                onClick={this.handleRegister}>
                                Register
                        </Button>
                        </form>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.errorMessage !== ''}
                            autoHideDuration={6000}
                            onClose={this.handleErrorClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.errorMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.handleErrorClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Login);