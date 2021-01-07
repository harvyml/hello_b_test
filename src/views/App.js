import React, { } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Router, Switch, Route, NavLink } from "react-router-dom"
//bootstrap
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import SingUp from "./components/Signup"

const App = () => {
    return (
        <div className="app">
            <HashRouter>
                <Route path="/signin" component={Login} />
                <Route path="/signup" component={SingUp} />
                <Route path="/app" component={InnerHashRouter} />
            </HashRouter>
        </div >
    )
}


const InnerHashRouter = () => {
    const Profile = () => <Dashboard board="Profile" component={() => <h1>Mi perfil</h1>} />
    const Home = () => <Dashboard board="Home" component={() => <h1>Home</h1>} />
    const Stuff = () => <Dashboard board="Stuff" component={() => <h1>Stuff</h1>} />
    return (
        <HashRouter>
            <Row>
                <Sidebar />
                <Col sm={9}>
                    <div className="content">
                        <Route exact path="/profile/" component={Profile} />
                        <Route exact path="/app/" component={Home} />
                        <Route path="/app/stuff" component={Stuff} />
                    </div>
                </Col>
            </Row>
        </HashRouter>
    )
}

export default App;