import React from 'react';
import axios from "axios";
import { Grid, Button, } from '@material-ui/core';
import logo from '../../assets/img/title.png'

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
    onSetStar=()=>{
        this.state.dataList.map(item=>{

        })
    }
    onDetail = (dataID) => {
        localStorage.setItem("detailID", dataID);
        window.location.href = "/homedetail"
    }
    render() {
        return (
            <div>
                <img src={logo} width="100%" />
                <a href="/login" style={{ padding: '50px' }}>Login</a>
                <Grid
                    container
                    spacing={3}
                    style={{ padding: '60px' }}
                >
                    {
                        this.state.dataList.map((item, index) => {
                            let stars = 0;
                            let count = 0;
                            let realRating = 0;
                            let realRatingOne = 0;
                            return (
                                <Grid item lg={2} md={3} sm={6} xs={12}   >
                                    <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                    <p>{item.address1} </p>
                                    <p>{item.address2}</p>
                                    <p>{item.managername}</p><br />
                                    {/* ★ */}
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
                                    <p>{item.freecount} openings </p>
                                    <p>{item.stars} stars </p>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        onClick={this.onDetail.bind(this, item._id)}
                                    > Details</Button>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }
}