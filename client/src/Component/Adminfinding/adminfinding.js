import React from 'react';
import axios from "axios";
import main_page from '../../assets/img/main_page.png'
import Mainmeun from '../Mainmeun/mainmeun'

import { Grid, Button, } from '@material-ui/core';

export default class Adminfinding extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount = () => {
        axios.post(localStorage.getItem("url") + '/todos/Bedshow')
            .then((res) => {
                let { dataList } = this.state
                if (res.data.length > 0)
                    dataList = res.data
                this.setState({ dataList })
                console.log(dataList)
            }).catch((error) => {
                console.log(error)
            });
    }
    Back = () => {
        window.location.href = "/adminmanage"
    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={main_page} width="80%" />
                    <div style={{ position: 'absolute', top: '10%', left: '50%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            <Mainmeun />
                        </div>
                    </div>
                    <div style={{ position: 'absolute', top: '20%', left: '25%', width: '40%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid item md={6} sm={12} xs={12} style={{ textAlign: 'left' }}  >
                                    <h2>{localStorage.getItem("findAddress1")}</h2>
                                    <h4>{localStorage.getItem("findAddress2")}</h4>
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}     >
                                    <table border="1" align="center" width="80%">
                                        <tr><td>LIC'D BEDS</td><td>OCCUPIED</td><td>AVAILABE</td></tr>
                                        <tr><td>{localStorage.getItem("findBedcount")}</td>
                                            <td>{localStorage.getItem("findRealcount")}</td>
                                            <td>{localStorage.getItem("findFreecount")}</td></tr>
                                    </table>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}      >
                                    <h4 style={{ textAlign: 'left' }}>Reports</h4>
                                    <table border="1" align="left" width="80%">
                                        <tr><td>Date</td><td>Title</td><td>Category</td><td>Plan of Action</td><td>Status</td></tr>
                                        <tr><td>01/02/2019</td><td><a href="">Employee Conduct</a></td><td>Person Involved</td><td><a href="#">Download</a></td><td><a href="#">Closed</a></td></tr>
                                        <tr><td>01/02/2019</td><td><a href="">Employee Conduct</a></td><td>Person Involved</td><td><a href="#">Download</a></td><td><a href="#">Closed</a></td></tr>
                                        <tr><td>01/02/2019</td><td><a href="">Employee Conduct</a></td><td>Person Involved</td><td><a href="#">Download</a></td><td><a href="#">Closed</a></td></tr>
                                    </table>
                                </Grid>
                            </Grid>
                            <br />
                            <Button style={{ color: 'blue' }} onClick={this.Back}>Back to property</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

