import React from 'react';
import { Button, Grid } from '@material-ui/core';
export default class Mainmenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    onDashboard = () => {
        window.location.href = "/"
    }
    onLogin = () => {
        window.location.href = "/login"
    }
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Button style={{ marginLeft: '30px' }} onClick={this.onDashboard}> Dashboard</Button>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Button style={{ marginLeft: '30px' }}> SUPPORT</Button>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Button style={{ marginLeft: '30px' }} onClick={this.onLogin}> LOG OUT</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}