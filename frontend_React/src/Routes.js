import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Component/Login/login";
import Signup from "./Component/SignUp/signup";
import Home from "./Component/Home/home";
import HomeDetail from "./Component/HomeDetail/homedetail";
import HomeGiveStar from "./Component/HomeGiveStar/homegivestar";
import Addbeds from "./Component/Addbeds/addbeds";
import Admin from "./Component/Admin/admin";
import Manager from "./Component/Manager/manager";
import AdminManage from "./Component/Admin_Manage/adminManage";
import Adminmanagebeds from "./Component/AdminManageBeds/adminmanagebeds";
import Adminfinding from "./Component/Adminfinding/adminfinding";
import Adminadmitnew from "./Component/Adminadmitnew/adminadmitnew";
import AdminBedsPropertyEdit from "./Component/AdminBedsPropertyEdit/adminbedspropertyedit";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/' component={Home} />
                <Route exact path='/homedetail' component={HomeDetail} />
                <Route exact path='/homegivestar' component={HomeGiveStar} />
                <Route exact path='/addbeds' component={Addbeds} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/manager' component={Manager} />
                <Route exact path='/adminmanage' component={AdminManage} />
                <Route exact path='/adminmanagebeds' component={Adminmanagebeds} />
                <Route exact path='/adminfinding' component={Adminfinding} />
                <Route exact path='/adminadmitnew' component={Adminadmitnew} />
                <Route exact path='/adminbedspropertyedit' component={AdminBedsPropertyEdit} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
