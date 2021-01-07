import React, { } from "react"
import ReactDOM from "react-dom"
import { HashRouter, Router, Switch, Route, NavLink } from "react-router-dom"
//bootstrap
import { Container, Row, Col, Button, Form } from "react-bootstrap"

const App = () => {
    const Home = () => <h1>Hola</h1>
    const Stuff = () => <h1>Stuff</h1>
    return (
        <div className="app">
            <HashRouter>
                <div>
                    <h1>Simple SPA</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/stuff">Stuff</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/stuff" component={Stuff} />
                    </div>
                </div>
            </HashRouter>
        </div>
    )
}

export default App;