import React from 'react';
import axios from "axios";
import { Grid, } from '@material-ui/core';


import logo from '../../assets/img/logo.png'
import rating1 from '../../assets/img/rating_1.png'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
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
    render() {
        return (
            <div>
                <img src={logo} style={{ padding: '20px' }} />
                <a href="/"  >Back Home Page</a>
                <Grid
                    container
                    spacing={3}
                    style={{ padding: '150px' }}
                >
                    {
                        this.state.dataList.map((item, index) => {
                            if (localStorage.getItem("detailID") == item._id) {
                                return (
                                    <div>
                                        <Grid
                                            container
                                            spacing={3}
                                        >
                                            <Grid item lg={4} md={12} sm={12} xs={12} >
                                                <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                                <Grid
                                                    container
                                                >
                                                    <Grid item lg={6} md={6} sm={6} xs={12} >
                                                        <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                                    </Grid>
                                                    <Grid item lg={6} md={6} sm={6} xs={12} >
                                                        <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item lg={4} md={12} sm={12} xs={12} >
                                                <Grid container >
                                                    <Grid item lg={9} md={9} sm={9} xs={9} ><h3>{item.address1}</h3></Grid>
                                                    <Grid item lg={3} md={3} sm={3} xs={3} ><br /><img src={rating1} /></Grid>
                                                </Grid>
                                                <div style={{ textAlign: 'left' }}>
                                                    <h4>{item.address2}<br />{item.managername}</h4>
                                                    <h4>Email: {item.manageremail}<br />Phone: {item.managerphoneNumber}</h4>
                                                </div> <br />
                                                <table border="1" align="center" width="100%">
                                                    <tr><td>LIC'D BEDS</td><td>OCCUPIED</td><td>AVAILABE</td></tr>
                                                    <tr><td>{item.bedcount}</td><td>{item.realcount}</td><td>{item.freecount}</td></tr>
                                                </table>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item lg={4} md={12} sm={12} xs={12} style={{ textAlign: 'left' }}>&nbsp;</Grid>
                                            <Grid item lg={8} md={12} sm={12} xs={12} style={{ textAlign: 'left' }}>
                                                <p><u>Property Description</u> </p>
                                                <p>{item.description}</p>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            }
                        })
                    }
                </Grid>
            </div>
        )
    }
}