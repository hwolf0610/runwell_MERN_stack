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
        localStorage.setItem("email", "");
        localStorage.setItem("password", "");
        window.location.href = "/login"
    }
    render() {
        return (
            <div style={{ position: 'absolute', top: '3%', left: '65%', font_size: '16px', z_index: '5', }}>
                <div style={{ position: 'relative', marginLeft: '50px' }}>
                    <Grid container>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Button style={{ marginLeft: '20px' }} onClick={this.onDashboard}> Dashboard</Button>
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Button style={{ marginLeft: '20px' }}> SUPPORT</Button>
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Button style={{ marginLeft: '20px' }} onClick={this.onLogin}> LOG OUT</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>

        )
    }
}