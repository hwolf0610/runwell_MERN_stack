import React from 'react';
import axios from "axios";
import main_page from '../../assets/img/main_page.png'
import Mainmeun from '../Mainmeun/mainmeun'
import { Grid, Button, } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

export default class Admin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            dataArray: [],
            offset: 0,
            pagercounter: 0,
        }
    }
    componentDidMount = () => {
        //get Bed's information from MongoDB
        axios.post(localStorage.getItem("url") + '/todos/Bedshow')
            .then((res) => {
                let { dataList, dataArray } = this.state
                if (res.data.length > 0)
                    dataList = res.data
                this.setState({ dataList })
                console.log(dataList)
                let counter = 0;
                dataList.map(item => {
                    if (localStorage.getItem("key") == 2) {
                        if (localStorage.getItem("name") == item.managername && localStorage.getItem("email") == item.manageremail) {
                            dataArray.push(item)
                            counter++;
                        }
                    } else if (localStorage.getItem("key") == 1) {
                        dataArray.push(item)
                        counter++;
                    }
                })
                this.setState({ dataArray })
                console.log(dataArray)
                if (counter < 3) {
                    this.setState({ pagercounter: 1 })
                } else {
                    this.setState({ pagercounter: counter / 3 })
                }
            }).catch((error) => {
                console.log(error)
            });
    }
    handleClick(offset) {
        this.setState({ offset });
        console.log("offset:", offset)
    }
    Manage = (data) => {
        localStorage.setItem("houseID", data);
        window.location.href = "/adminmanage"
    }
    onAddbeds = () => {
        window.location.href = "/addbeds"
    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={main_page} width="100%" />
                    <Mainmeun />
                    <div style={{ position: 'absolute', top: '20%', left: '20%', width: '40%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px' }}>
                            <h2>ACME Homes, LLC</h2>
                            <Grid container>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Table
                                        aria-labelledby="tableTitle"
                                        size={'medium'}
                                        aria-label="enhanced table"
                                    >
                                        <TableBody>
                                            {
                                                this.state.dataArray.map((item, index) => {
                                                    let start = this.state.offset * 3 - 1
                                                    let end = this.state.offset * 3 + 3
                                                    while (start < index && index < end) {
                                                        return (
                                                            <TableRow
                                                                hover
                                                                tabIndex={-1}
                                                                key={index}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <img src={`http://localhost:3000/static/media/${item.mainimage}`} width="100%"/>
                                                                </TableCell>
                                                                <TableCell padding="checkbox">
                                                                    <h3 style={{ textAlign: 'left' }}>{item.address1}</h3>
                                                                    <div>
                                                                        <table border="1" align="center" width="80%">
                                                                            <tr><td>LIC'D BEDS</td><td>OCCUPIED</td><td>AVAILABE</td></tr>
                                                                            <tr><td>{item.bedcount}</td><td>{item.realcount}</td><td>{item.freecount}</td></tr>
                                                                        </table>
                                                                    </div>
                                                                    <Button style={{ color: 'blue' }} onClick={this.Manage.bind(this, item._id)}>Manage</Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                    <MuiThemeProvider theme={theme}>
                                        <CssBaseline />
                                        <Pagination
                                            limit={1}
                                            offset={this.state.offset}
                                            total={this.state.pagercounter}
                                            onClick={(e, offset) => this.handleClick(offset)}
                                        />
                                    </MuiThemeProvider>
                                </Grid>
                            </Grid>
                            <br />
                            <Button style={{ color: 'blue' }} onClick={this.onAddbeds}>Add new licensed property</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

