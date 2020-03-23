import React from 'react';
import axios from "axios";
import main_page from '../../assets/img/main_page.png'
import Mainmeun from '../Mainmeun/mainmeun'

import { SingleSelect } from "react-select-material-ui";

import { Grid, Button, TextField, } from '@material-ui/core';

export default class HomeGiveStar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            gender: ['male', 'female'],
            selectedDate: new Date(),
            address1: '',
            address2: '',
            manageremail: '',
            rating: '',
            username: '',

        }
    }
    onRating = (e) => { this.setState({ rating: e.target.value }); }
    onUsername = (e) => { this.setState({ username: e.target.value }); }

    onGiveStar = () => {
        let body = { address1: localStorage.getItem("StarAddress1"), address2: localStorage.getItem("StarAddress2"), manageremail: localStorage.getItem("StarManageEmail"), rating: this.state.rating, username: this.state.username }
        axios.post(localStorage.getItem("url") + '/todos/addStar', body)
            .then((res) => {
                console.log(res.data)
                window.location.href="/homedetail"
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
                            <h2>Please input your star !!!</h2>
                            <Grid
                                container
                            >
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="Rating"
                                        name="Rating"
                                        onChange={this.onRating}
                                        type="number"
                                        value={this.state.rating}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={4} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <TextField
                                        fullWidth
                                        label="User Name"
                                        name="User Name"
                                        onChange={this.onUsername}
                                        type="text"
                                        value={this.state.username}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={8} md={6} sm={12} xs={12} style={{ padding: '10px' }} >
                                    <Button style={{ backgroundColor: '#2bc941', color: 'white' }} onClick={this.onGiveStar}>ADD Star</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

