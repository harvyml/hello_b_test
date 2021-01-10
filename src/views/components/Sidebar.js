import React, { useState, useEffect, useContext } from "react"
import { Row, Col, Nav, Card, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import {UserContext} from "./UserContext"

const Sidebar = ({ active }) => {
    const user = useContext(UserContext)
    useEffect(() => {
        console.log(user)
    }, [])
    return (
        <Col sm={12} md={3} className="desktop-sidebar-container">
            <nav>
                <Row>
                    <div className="desktop-sidebar">
                        <Card className="full-width">
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">User</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Card.Link href="#">My Profile</Card.Link>
                            </Card.Body>
                        </Card>
                        <Nav defaultActiveKey="/app/stuff" className="flex-column desktop-nav">
                            <NavLink activeStyle={{
                                fontWeight: "bold",
                                color: "green"
                            }} exact to="/app/profile"><span className="material-icons">person</span>Profile</NavLink>
                            <NavLink activeStyle={{
                                fontWeight: "bold",
                                color: "green"
                            }} exact to="/app/calendar"><span className="material-icons">event</span>Calendar</NavLink>
                            <NavLink activeStyle={{
                                fontWeight: "bold",
                                color: "green"
                            }} exact to="/app/github"><span className="material-icons">folder</span>Repository</NavLink>
                        </Nav>
                    </div>
                </Row>
            </nav>
        </Col>
    )
}

export default Sidebar