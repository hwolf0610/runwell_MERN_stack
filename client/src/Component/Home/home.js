import React from 'react';
import axios from "axios";
import { Grid, Button, } from '@material-ui/core';
import logo from '../../assets/img/logo.png'

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
    onDetail = (dataID) => {
        localStorage.setItem("detailID", dataID);
        window.location.href = "/homedetail"
    }
    render() {
        return (
            <div>
                <img src={logo} style={{ padding: '20px' }} />
                <a href="/login"  >Login</a>
                <Grid
                    container
                    spacing={3}
                    style={{ padding: '60px' }}
                >
                    {
                        this.state.dataList.map((item, index) => {
                            return (
                                <Grid item lg={2} md={3} sm={6} xs={12}   >
                                    <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                    <p>{item.address1} </p>
                                    <p>{item.address2}</p>
                                    <p>{item.managername}</p><br />
                                    <p>{item.realcount} openings </p>
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