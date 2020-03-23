import React from 'react';
import axios from "axios";
import { Grid, Button, } from '@material-ui/core';


import logo from '../../assets/img/title.png'
import rating1 from '../../assets/img/rating_1.png'

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            dataStar: [],
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

                axios.post(localStorage.getItem("url") + '/todos/Starshow')
                    .then((res) => {
                        let { dataStar } = this.state
                        if (res.data.length > 0)
                            dataStar = res.data
                        this.setState({ dataStar })
                        console.log(dataStar)
                    }).catch((error) => {
                        console.log(error)
                    });
            }).catch((error) => {
                console.log(error)
            });


    }
    onStar = (dataAddress1, dataAddress2, dataManageEmail) => {
        localStorage.setItem("StarAddress1", dataAddress1)
        localStorage.setItem("StarAddress2", dataAddress2)
        localStorage.setItem("StarManageEmail", dataManageEmail)
        window.location.href = "/homegivestar"
    }
    render() {
        return (
            <div>
                <img src={logo} width="100%" />
                <a href="/" style={{ padding: '50px' }}>Back Home Page</a>
                <Grid
                    container
                    spacing={3}
                    style={{ padding: '150px' }}
                >
                    {
                        this.state.dataList.map((item, index) => {
                            let stars = 0;
                            let count = 0;
                            let realRating = 0;
                            let realRatingOne = 0;
                            if (localStorage.getItem("detailID") == item._id) {
                                return (
                                    <div style={{ width: '60%' }}>
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
                                            <Grid item lg={8} md={12} sm={12} xs={12} >
                                                <Grid container >
                                                    <Grid item lg={9} md={9} sm={9} xs={9} ><h3>{item.address1}</h3></Grid>
                                                    <Grid item lg={3} md={3} sm={3} xs={3} ><br />

                                                        <p>
                                                            {

                                                                this.state.dataStar.map(itemStar => {

                                                                    if (itemStar.address1 == item.address1 && itemStar.address2 == item.address2 && itemStar.manageremail == item.manageremail) {
                                                                        stars += itemStar.rating
                                                                        count++
                                                                        realRatingOne =itemStar.rating
                                                                    }
                                                                    realRating = stars / count;
                                                                })
                                                            }
                                                            <Rater rating={realRatingOne} total={5} interactive={false} />
                                                        </p>

                                                    </Grid>
                                                </Grid>
                                                <div style={{ textAlign: 'left' }}>
                                                    <h4>{item.address2}<br />{item.managername}</h4>
                                                    <Button style={{ backgroundColor: '#2bc941', color: 'white' }} onClick={this.onStar.bind(this, item.address1, item.address2, item.manageremail)}>Give Star</Button>
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