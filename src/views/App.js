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
import Repos from "./Repos"
import { UserContext } from "./components/UserContext"

const App = () => {
    return (
        <div className="app">
            <HashRouter>
                <Route path="/app" component={InnerHashRouter} />
                <Route path="/" component={() => <Redirect to="/app"/>}/>
                <Route path="/signin" component={Login} />
                <Route path="/signup" component={SingUp} />
            </HashRouter>
        </div >
    )
}


const InnerHashRouter = () => {
    const [allowRoutes, setAllowRoutes] = useState(false)
    const user = useUser()
    const Home = () => <Dashboard board="Home" component={() => <h1>Home</h1>} />
    const Stuff = () => <Dashboard board="Stuff" component={() => <h1>Stuff</h1>} />
    return (
        <HashRouter>
            <Row className="display-block-on-desktop">
                <UserContext.Provider value={user}>
                    <Sidebar/>
                    <Col sm={9}>
                        <div className="content">
                            <Route exact path="/app/profile/" component={Profile} />
                            <Route exact path="/app/" component={Home} />
                            <Route path="/app/github" component={Repos} />
                        </div>
                    </Col>
                </UserContext.Provider>
            </Row>
        </HashRouter>
    )
}

export default App;