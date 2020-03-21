import React from 'react';
import axios from "axios";
import main_page from '../../assets/img/main_page.png'
import Mainmeun from '../Mainmeun/mainmeun'
import { Grid, Button, TextField, } from '@material-ui/core';

export default class Addbeds extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            address1: '',
            address2: '',
            stars: '',
            bedcount: '',
            description: '',
            mainimage: null,
            bedimage1: null,
            bedimage2: null,
            dataList: [],
        }
    }
    componentDidMount = () => {
        //get user information in MongoDB 
        axios.post(localStorage.getItem("url") + '/todos/Usershow')
            .then((res) => {
                if (res.data.length > 0)
                    this.setState({ dataList: res.data })
                console.log("datalist:", this.state.dataList)
            }).catch((error) => {
                console.log(error)
            });
    }
    Back = () => {
        window.location.href = "/admin"
    }
    onNewSetting = () => {
        this.setState({
            address1: '',
            address2: '',
            bedcount: '',
            description: '',
            mainimage: null,
        })

    }
    changeaddress1 = (e) => { this.setState({ address1: e.target.value }); }
    changeaddress2 = (e) => { this.setState({ address2: e.target.value }); }
    changestars = (e) => { this.setState({ stars: e.target.value }); }
    changebedcount = (e) => { this.setState({ bedcount: e.target.value }); }
    changedescription = (e) => { this.setState({ description: e.target.value }); }
    changemainimage = (event) => {
        this.setState({ mainimage: event.target.files[0] })
    }
    changebedimage1 = (event) => {
        this.setState({ bedimage1: event.target.files[0] })
    }
    changebedimage2 = (event) => {
        this.setState({ bedimage2: event.target.files[0] })
    }
    //save Bed's information with image and data to MonogoDB
    onSave = () => {
        var date = new Date();
        var sendDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getDay() + "-" + date.getHours() + "-" + this.state.mainimage.name
        let data = new FormData();
        data.append("file1", this.state.mainimage);
        data.set("address1", this.state.address1);
        data.set("address2", this.state.address2);
        data.set("managername", localStorage.getItem("name"));
        data.set("manageremail", localStorage.getItem("email"));
        data.set("managerphoneNumber", localStorage.getItem("phoneNumber"));
        data.set("stars", "0");
        data.set("bedcount", this.state.bedcount);
        data.set("realcount", "0");
        data.set("freecount", this.state.bedcount);
        data.set("description", this.state.description);
        data.set("mainimage", sendDate);
        data.set("bedimage1", sendDate);
        data.set("bedimage2", sendDate);
        axios.post(localStorage.getItem("url") + '/addBeds', data)
            .then(res => { // then print response status
                alert("The house is added !!!");
            })
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
                    <div style={{ position: 'absolute', top: '20%', left: '20%', width: '50%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            <h2>Add new Beds !!!</h2>
                            <Grid container spacing={3}  >
                                <Grid item lg={6} md={6} sm={6} xs={12} >
                                    <TextField
                                        fullWidth
                                        style={{ backgroundColor: 'white' }}
                                        label="Address1"
                                        name="Address1"
                                        onChange={this.changeaddress1}
                                        type="text"
                                        value={this.state.address1}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12} >
                                    <TextField
                                        fullWidth
                                        style={{ backgroundColor: 'white' }}
                                        label="Address2"
                                        name="Address2"
                                        onChange={this.changeaddress2}
                                        type="text"
                                        value={this.state.address2}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12} >
                                    <TextField
                                        fullWidth
                                        style={{ backgroundColor: 'white' }}
                                        label="Bed Count"
                                        name="Bed Count"
                                        onChange={this.changebedcount}
                                        type="number"
                                        value={this.state.bedcount}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={12} >
                                    <TextField
                                        fullWidth
                                        style={{ backgroundColor: 'white' }}
                                        label="Property Description"
                                        name="Property Description"
                                        onChange={this.changedescription}
                                        type="text"
                                        value={this.state.description}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <input id="myInput" type="file" ref={(ref) => this.myInput1 = ref} style={{ display: 'none' }} onChange={this.changemainimage} />
                                    <Button
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        onClick={(e) => this.myInput1.click()}
                                    > Open Bed image</Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        onClick={this.onSave}
                                    > Save</Button>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        variant="contained"
                                        onClick={this.onNewSetting}
                                    > Add new Bed</Button>
                                </Grid>
                            </Grid>
                            <br />
                            <Button style={{ color: 'blue' }} onClick={this.Back}>Back to Dashboard</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

