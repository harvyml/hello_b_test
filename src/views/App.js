import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Router, Switch, Route, NavLink, Redirect, useLocation } from "react-router-dom"
//bootstrap
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import useUser from "./components/hooks/useUser"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import SingUp from "./components/Signup"
import Profile from "./Profile"
import {Repos} from "./Repos"
import {Calendar} from "./Calendar"
import { UserContext } from "./components/UserContext"

const App = () => {
    return (
        <div className="app">
            <HashRouter>
                <Route exact path="/" component={() => <Redirect to="/app"/>}/>
                <Route path="/app" component={InnerHashRouter} />
                <Route path="/signin" component={Login} />
                <Route path="/signup" component={SingUp} />
            </HashRouter>
        </div >
    )
}


const InnerHashRouter = () => {
    const user = useUser()
    return (
        <HashRouter>
            <Row className="display-block-on-desktop">
                <UserContext.Provider value={user}>
                    <Sidebar/>
                    <Col xs={12} sm={12} md={9} lg={9} className="float-right-on-desktop">
                        <div className="content">
                            <Route exact path="/app/" component={() => <Redirect to="/app/profile" />} />
                            { user ? <Route exact path="/app/profile/" component={Profile} /> : <Redirect to="/signup"/>}
                            { user ? <Route path="/app/github" component={Repos} /> : <Redirect to="/signup"/>}
                            { user ? <Route path="/app/calendar" component={Calendar} /> : <Redirect to="/signup"/>}
                        </div>
                    </Col>
                </UserContext.Provider>
            </Row>
        </HashRouter>
    )
}

export default App;