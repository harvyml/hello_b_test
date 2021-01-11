import React, { useState, useEffect, useContext } from "react"
import { Row, Col, Nav, Card, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { UserContext } from "./UserContext"

const Sidebar = () => {
    const on_active = {
        fontWeight: "bold",
        color: "green"
    }
    const user = useContext(UserContext)
    return (
        <Col xs={12} sm={12} md={3} lg={3} className="desktop-sidebar-container">
            <nav>
                <Row>
                    <div className="desktop-sidebar">
                        <Card className="full-width">
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted margined-top">{user.email}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        <Nav defaultActiveKey="/app/stuff" className="flex-column desktop-nav">
                            <NavLink activeStyle={on_active} exact to="/app/profile"><span className="material-icons">person</span>Profile</NavLink>
                            <NavLink activeStyle={on_active} exact to="/app/calendar"><span className="material-icons">event</span>Calendar</NavLink>
                            <NavLink activeStyle={on_active} exact to="/app/github"><span className="material-icons">folder</span>Repository</NavLink>
                        </Nav>
                    </div>
                </Row>
            </nav>
        </Col>
    )
}

export default Sidebar