import React from 'react';
import axios from "axios";
import main_page from '../../assets/img/main_page.png'
import rating1 from '../../assets/img/rating_1.png'
import Mainmeun from '../Mainmeun/mainmeun'

import { Grid, Button } from '@material-ui/core';

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

export default class AdminManage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            dataStar: [],
            mainimage: null,
        }
    }
    componentDidMount = () => {
        //get Bed's information from MongoDB
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
    Back = () => {
        window.location.href = "/admin"
    }
    onManagebeds = (dataId, dataAddress1, dataAddress2, dataManageName) => {
        localStorage.setItem("dataId", dataId)
        localStorage.setItem("houseAddress1", dataAddress1)
        localStorage.setItem("houseAddress2", dataAddress2)
        localStorage.setItem("houseManageName", dataManageName)
        window.location.href = "/adminmanagebeds"
    }
    onFinding = (dataID, dataAddress1, dataAddress2, dataBedcount, dataRealcount, dataFreecount) => {
        localStorage.setItem("findID", dataID)
        localStorage.setItem("findAddress1", dataAddress1)
        localStorage.setItem("findAddress2", dataAddress2)
        localStorage.setItem("findBedcount", dataBedcount)
        localStorage.setItem("findRealcount", dataRealcount)
        localStorage.setItem("findFreecount", dataFreecount)
        window.location.href = "/adminfinding"
    }
    onEdit = (dataID, dataAddress1, dataAddress2, dataBedcount, dataDescription, dataMainimage) => {
        localStorage.setItem("editID", dataID)
        localStorage.setItem("editAddress1", dataAddress1)
        localStorage.setItem("editAddress2", dataAddress2)
        localStorage.setItem("editBedcount", dataBedcount)
        localStorage.setItem("editDescription", dataDescription)
        localStorage.setItem("editMainimage", dataMainimage)
        window.location.href = "/adminbedspropertyedit"
    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={main_page} width="100%" />
                    <Mainmeun />
                    <div style={{ position: 'absolute', top: '25%', left: '20%', width: '50%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            {
                                this.state.dataList.map(item => {
                                    let stars = 0;
                                    let count = 0;
                                    let realRating = 0;
                                    let realRatingOne = 0;
                                    if (localStorage.getItem("houseID") == item._id) {
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
                                                            spacing={1}
                                                        >
                                                            <Grid item lg={6} md={6} sm={6} xs={12} >
                                                                <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                                            </Grid>
                                                            <Grid item lg={6} md={6} sm={6} xs={12} >
                                                                <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%" />
                                                            </Grid>
                                                            <Grid item lg={12} md={12} sm={12} xs={12} >
                                                                <Button
                                                                    fullWidth
                                                                    size="large"
                                                                    variant="contained"
                                                                    style={{ backgroundColor: '#234567', color: 'white' }}
                                                                    onClick={this.onEdit.bind(this, item._id, item.address1, item.address2, item.bedcount, item.description, item.mainimage)}
                                                                >  Edit </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item lg={4} md={12} sm={12} xs={12} >
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
                                                            <h4>Email: {item.manageremail}<br />Phone: {item.managerphoneNumber}</h4>
                                                        </div>
                                                        <table border="1" align="center" width="100%">
                                                            <tr><td>LIC'D BEDS</td><td>OCCUPIED</td><td>AVAILABE</td></tr>
                                                            <tr><td>{item.bedcount}</td><td>{item.realcount}</td><td>{item.freecount}</td></tr>
                                                        </table>
                                                    </Grid>
                                                    <Grid item lg={4} md={12} sm={12} xs={12} >
                                                        <Button style={{ backgroundColor: '#349aff' }} onClick={this.onManagebeds.bind(this, item._id, item.address1, item.address2, item.managername)}>View Manage Beds</Button>&nbsp;<br /><br />
                                                        <Button style={{ backgroundColor: '#ff6059' }} onClick={this.onFinding.bind(this, item._id, item.address1, item.address2, item.bedcount, item.realcount, item.freecount)}>View Findings</Button>
                                                    </Grid>
                                                </Grid>
                                                <Grid container>
                                                    <Grid item lg={4} md={12} sm={12} xs={12} style={{ textAlign: 'left' }}>&nbsp;</Grid>
                                                    <Grid item lg={8} md={12} sm={12} xs={12} style={{ textAlign: 'left' }}>
                                                        <p><u>Property Description</u>  </p>
                                                        <p>{item.description}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                    }
                                })
                            }
                            <Button style={{ color: 'blue' }} onClick={this.Back}>Back to Dashboard</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

