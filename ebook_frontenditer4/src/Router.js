import React, {Component} from 'react';
import {Router, Route, Switch,Redirect} from 'react-router-dom';
import {history} from "./utils/history";

import HomeView from "./view/homeView";
import LoginView from './view/loginView';
import BookView from './view/bookView';
import BookInfo from './view/bookDetail';
import RegisterView from "./view/registerView";
import CartView from "./view/cartView";
import AdminView from "./view/adminView";
import AdminBookView from "./view/admin_bookView";
import UserBuyView from "./view/userBuyView";
import {AdminBookHotView} from "./view/admin_bookHot";
import {AdminOrderDetail} from "./view/admin_orderDetail";
import AdminUserHotView from "./view/admin_soldHot";
import AdminOrderView from "./view/admin_orderView";
import {OrderView} from "./view/orderView";
import {OrderDetail} from "./view/orderDetail"


class BasicRoute extends React.Component {

    constructor(props) {
        super(props);
        history.listen((location, action) => {
            console.log(location, action);
        });
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={LoginView}/>
                    <Route exact path={"/login"} component={LoginView}/>
                    <Route exact path={"/cart"} component={CartView}/>
                    <Route exact path={"/book"} component={BookView}/>
                    <Route exact path={"/bookDe"} component={BookInfo}/>
                    <Route exact path={"/register"} component={RegisterView}/>
                    <Route exact path={"/home"} component={HomeView}/>
                    <Route exact path={"/order"} component={OrderView}/>
                    <Route exact path={"/orderDe"} component={OrderDetail}/>
                    <Route exact path={"/admin"} component={AdminView}/>
                    <Route exact path={"/adminBook"} component={AdminBookView}/>
                    <Route exact path={"/adminOrder"} component={AdminOrderView}/>
                    <Route exact path={"/adminOrderDe"} component={AdminOrderDetail}/>
                    <Route exact path={"/adminBookHot"} component={AdminBookHotView}/>
                    <Route exact path={"/adminSoldHot"} component={AdminUserHotView}/>
                    <Route exact path={"/getUserBuy"} component={UserBuyView}/>
                    {/*<Redirect from="/*" to="/" />*/}
                </Switch>
            </Router>
        );
    }
}

export default BasicRoute;
