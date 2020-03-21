import React from 'react';
import axios from "axios";

import home_page from '../../assets/img/home_page.png'
import logo from '../../assets/img/logo_white.png'

import { Grid, Button, TextField, } from '@material-ui/core';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',

        }
    }
    componentDidMount = () => {
        let body = { firstName: 'admin', lastName: 'admin', email: 'admin', password: 'admin', phoneNumber: '1234567890', flag: '1' }
        axios.post(localStorage.getItem("url") + '/todos/start', body)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

    }
    changeemail = (e) => { this.setState({ email: e.target.value }); }
    changepass = (e) => { this.setState({ password: e.target.value }); }
    onSignin = () => {
        let body = { email: this.state.email, password: this.state.password }
        axios.post(localStorage.getItem("url") + '/todos/login', body)
            .then((res) => {
                console.log(res.data.data)
                if (res.data.data.email[0].length > 0) {
                    localStorage.setItem("name", res.data.data.firstName);
                    localStorage.setItem("email", res.data.data.email);
                    localStorage.setItem("phoneNumber", res.data.data.phoneNumber);
                    if (res.data.data.flag == 1) {
                        localStorage.setItem("key", "1");
                        window.location.href = '/admin'
                    } else if (res.data.data.flag == 2) {
                        localStorage.setItem("key", "2");
                        window.location.href = '/admin'
                    }

                } else {
                    alert("No member!");
                }
                console.log(res.data.data.email)
            }).catch((error) => {
                console.log(error)
                alert("Wrong username or password!");
            })
        this.setState({ email: '', password: '' })
    }
    onBack = () => {
        window.location.href = "/"
    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={home_page} width="80%" />
                    <div style={{ position: 'absolute', top: '25%', left: '30%', width: '40%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            <Grid container spacing={3}  >
                                <Grid item lg={6} md={12} sm={12} xs={12} >
                                    <br /><br /><br /><img src={logo} width="100%" />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12} >
                                    <Grid container spacing={3} >
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <p style={{ color: 'white', font_size: '35px' }}>
                                                <h3 onClick={this.onBack} style={{ cursor: 'pointer' }}>Welcome back. </h3></p>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <TextField
                                                fullWidth
                                                style={{ backgroundColor: 'white' }}
                                                label="Email address"
                                                name="email"
                                                onChange={this.changeemail}
                                                type="text"
                                                value={this.state.email}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <TextField
                                                fullWidth
                                                style={{ backgroundColor: 'white' }}
                                                label="Password"
                                                name="password"
                                                onChange={this.changepass}
                                                type="password"
                                                value={this.state.password}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <Button
                                                color="primary"
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                onClick={this.onSignin}
                                            > Sign in now</Button>
                                            <span style={{ color: 'white' }}>Don't have an account? &nbsp;&nbsp;&nbsp;</span>
                                            <a href="/signup" ><span style={{ color: 'white' }}>Sign Up</span> </a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default Login;
