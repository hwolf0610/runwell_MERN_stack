import React from 'react';
import axios from "axios";
import main_page from '../../assets/img/main_page.png'
import Mainmeun from '../Mainmeun/mainmeun'

import { SingleSelect } from "react-select-material-ui";

import { Grid, Button, TextField, } from '@material-ui/core';

export default class Adminadmitnew extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gender: ['male', 'female'],
            selectedDate: new Date(),
            firstName: '',
            lastName: '',
            DOB: '',
            SSN: '',
            Race: '',
            admitDate: '',
            address1: '',
            address2: '',
            managername: '',

        }
    }
    Back = () => {
        window.location.href = "/adminmanage"
    }
    handleDateChange = date => {
        this.setSelectedDate(date);
        console.log("data:", this.state.selectedDate)
    };
    onFristName = (e) => { this.setState({ firstName: e.target.value }); }
    onlastName = (e) => { this.setState({ lastName: e.target.value }); }
    onDOB = (e) => { this.setState({ DOB: e.target.value }); }
    onSSN = (e) => { this.setState({ SSN: e.target.value }); }
    onRace = (e) => { this.setState({ Race: e.target.value }); }
    onGender = (e) => { this.setState({ gender: e }); }
    onAdmitDate = (e) => { this.setState({ admitDate: e.target.value }); }

    adminadmitnew = () => {
        let body = { address1: localStorage.getItem("houseAddress1"), address2: localStorage.getItem("houseAddress2"), managername: localStorage.getItem("houseManageName"), firstName: this.state.firstName, lastName: this.state.lastName, DOB: this.state.DOB, SSN: this.state.SSN, gender: this.state.gender, RACE: this.state.Race, AdmitDate: this.state.admitDate, houseID: localStorage.getItem("houseID") }
        console.log("body:", body)
        axios.post(localStorage.getItem("url") + '/todos/addMember', body)
            .then((res) => {
                console.log(res.data)
                let id = localStorage.getItem("houseID");
                let body = { name: "1" }
                axios.post(localStorage.getItem("url") + '/todos/BedsUpdateIncrease/' + id, body)
                    .then((res) => {
                        console.log(res.data)
                        alert("Successful!!");
                        window.location.href = '/adminmanagebeds'
                    }).catch((error) => {
                        console.log(error)
                    });
            }).catch((error) => {
                console.log(error)
            });
    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={main_page} width="100%" />
                    <Mainmeun />
                    <div style={{ position: 'absolute', top: '15%', left: '25%', width: '40%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px', }}>
                            <Grid
                                container
                                style={{ padding: '25px' }}
                            >
                                <Grid item lg={12} md={12} sm={12} xs={12} style={{ textAlign: 'left' }} >
                                    <h3>{localStorage.getItem("houseAddress1")}</h3>
                                    <h4>{localStorage.getItem("houseAddress2")}</h4>
                                    <h5>{localStorage.getItem("houseManageName")}</h5>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                            >
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="Frist Name"
                                        name="Frist Name"
                                        onChange={this.onFristName}
                                        type="text"
                                        value={this.state.firstName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="Last Name"
                                        onChange={this.onlastName}
                                        type="text"
                                        value={this.state.lastName}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="DOB"
                                        name="DOB"
                                        onChange={this.onDOB}
                                        type="text"
                                        value={this.state.DOB}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="SSN"
                                        name="SSN"
                                        onChange={this.onSSN}
                                        type="number"
                                        value={this.state.SSN}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="Race"
                                        name="Race"
                                        onChange={this.onRace}
                                        type="text"
                                        value={this.state.Race}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <SingleSelect value={this.state.name} placeholder="Select a Gender" required options={this.state.gender} onChange={this.onGender} />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="Admit Date"
                                        name="Admit Date"
                                        onChange={this.onAdmitDate}
                                        type="text"
                                        value={this.state.admitDate}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={8} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <Button style={{ backgroundColor: '#2bc941', color: 'white' }} onClick={this.adminadmitnew}>ADD PERDON</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

