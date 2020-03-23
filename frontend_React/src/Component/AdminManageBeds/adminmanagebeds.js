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

export default class Adminmanagebeds extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dataList: [],
            offset: 0,
            pagercounter: 0,
        }
    }
    componentDidMount = () => {
        axios.post(localStorage.getItem("url") + '/todos/CustomerShow')
            .then((res) => {
                let { dataList } = this.state
                if (res.data.length > 0)
                    dataList = res.data
                this.setState({ dataList })
                console.log(dataList)
                let counter = res.data.length;
                if (counter < 5) {
                    this.setState({ pagercounter: 1 })
                } else {
                    this.setState({ pagercounter: counter / 5 })
                }
            }).catch((error) => {
                console.log(error)
            });
    }
    handleClick(offset) {
        this.setState({ offset });
        console.log("offset:", offset)
    }
    delete = (data) => {
        alert("item clicked : " + data)
        let id = data
        axios.delete(localStorage.getItem("url") + '/todos/BedCustomerDel/' + id)
            .then((res) => {
                console.log(res.data)
                let id = localStorage.getItem("houseID");
                let body = { name: "1" }
                axios.post(localStorage.getItem("url") + '/todos/BedsUpdateDiscrease/' + id, body)
                    .then((res) => {
                        console.log(res.data)
                        alert("Successful!!");
                        window.location.reload();
                    }).catch((error) => {
                        console.log(error)
                    });

            }).catch((error) => {
                console.log(error)
            });
    }
    Back = () => {
        window.location.href = "/adminmanage"
    }
    adminadmitnew = () => {
        window.location.href = "/adminadmitnew"
    }
    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={main_page} width="100%" />
                    <Mainmeun />
                    <div style={{ position: 'absolute', top: '25%', left: '18%', width: '50%', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', marginLeft: '50px', }}>
                            <Grid
                                container
                            >
                                <Grid
                                    item
                                    sm={9} style={{ textAlign: 'left' }}>
                                    <h3>{localStorage.getItem("houseAddress1")}</h3>
                                    <h4>{localStorage.getItem("houseAddress2")}</h4>
                                    <h5>{localStorage.getItem("houseManageName")}</h5>
                                </Grid>
                                <Grid
                                    item
                                    sm={3}>
                                    <Button style={{ backgroundColor: '#2bc941' }} onClick={this.adminadmitnew}>Admit new</Button>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                    <Table
                                        aria-labelledby="tableTitle"
                                        size={'medium'}
                                        aria-label="enhanced table"
                                    >

                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <span>No</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>Frist Name</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>Last Name</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>DOB</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>SSN</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>GENDER</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>RACE</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>ADMIT DATE</span>
                                                </TableCell>
                                                <TableCell padding="checkbox">
                                                    <span>DISCHARGE</span>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {

                                                this.state.dataList.map((item, index) => {
                                                    if (localStorage.getItem("houseID") == item.houseID) {
                                                        let start = this.state.offset * 5 - 1
                                                        let end = this.state.offset * 5 + 5
                                                        while (start < index && index < end) {
                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    tabIndex={-1}
                                                                    key={index}
                                                                >
                                                                    <TableCell padding="checkbox">
                                                                        <span>{index + 1}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.firstName}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.lastName}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.DOB}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.SSN}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.gender}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.RACE}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <span>{item.AdmitDate}</span>
                                                                    </TableCell>
                                                                    <TableCell padding="checkbox">
                                                                        <Button onClick={this.delete.bind(this, item._id)} >DISCHARGE</Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        }
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
                            <Button style={{ color: 'blue' }} onClick={this.Back}>Back to Property</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

