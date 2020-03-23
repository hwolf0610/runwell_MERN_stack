import React from 'react';
import axios from "axios";

import home_page from '../../assets/img/home_page.png'
import logo from '../../assets/img/logo_white.png'

import { Grid, Button, TextField, } from '@material-ui/core';

export default class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fristName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumber: '',

        }
    }
    componentDidMount = () => {

    }
    changeFristname = (e) => { this.setState({ fristName: e.target.value }); }
    changeLastname = (e) => { this.setState({ lastName: e.target.value }); }
    changeemail = (e) => { this.setState({ email: e.target.value }); }
    changepass = (e) => { this.setState({ password: e.target.value }); }
    changePhonenumber = (e) => { this.setState({ phoneNumber: e.target.value }); }
    onSignin = () => {
        let body = { firstName: this.state.fristName, lastName: this.state.lastName, email: this.state.email, password: this.state.password, phoneNumber: this.state.phoneNumber, flag: "2" }
        axios.post(localStorage.getItem("url") + '/todos/signup', body)
            .then((res) => {
                console.log(res.data)
                alert("Successful!!");
                window.location.href = '/login'
            }).catch((error) => {
                console.log(error)
            });


    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={home_page} width="100%" />
                    <div style={{ position: 'absolute', top: '15%', left: '30%', width: '40%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            <Grid container spacing={3}  >
                                <Grid item lg={6} md={12} sm={12} xs={12} >
                                    <br /><br /><br /><img src={logo} width="100%" />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12} >
                                    <Grid container spacing={3} >
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <p style={{ color: 'white', font_size: '35px' }}><h3>Welcome back. </h3></p>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <TextField
                                                fullWidth
                                                style={{ backgroundColor: 'white' }}
                                                label="Frist Name"
                                                name="Frist Name"
                                                onChange={this.changeFristname}
                                                type="text"
                                                value={this.state.fristName}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} >
                                            <TextField
                                                fullWidth
                                                style={{ backgroundColor: 'white' }}
                                                label="Last Name"
                                                name="Last Name"
                                                onChange={this.changeLastname}
                                                type="text"
                                                value={this.state.lastName}
                                                variant="outlined"
                                            />
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
                                            <TextField
                                                fullWidth
                                                style={{ backgroundColor: 'white' }}
                                                label="Phone Number"
                                                name="Phone Number"
                                                onChange={this.changePhonenumber}
                                                type="number"
                                                value={this.state.phoneNumber}
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
                                            > Sign up now</Button>
                                            <span style={{ color: 'white' }}>Already have an account?&nbsp;&nbsp;&nbsp;</span>
                                            <a href="/login" ><span style={{ color: 'white' }}>Login</span></a>
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
