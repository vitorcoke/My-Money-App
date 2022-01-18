import React from "react";
import { Route, Switch, Redirect, } from 'react-router-dom'

import Dashboard from "../pages/dashboard/Dashboard";
import BillingCycles from "../pages/billingCycles/BillingCycles";

const Routers: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/billingCycles" component={BillingCycles} />
            <Redirect from='*' to='/' ></Redirect>
        </Switch>

    )
}

export default Routers