import React, { useState, useEffect } from "react"
import { Row, Col, Nav, Card, Navbar, NavDropdown } from "react-bootstrap"
import {NavLink} from "react-router-dom"


const Sidebar = ({ user, active }) => {
    return (
        <Col sm={12} md={3}>
            <nav>
                <Row>
                    <div className="desktop-sidebar">
                        <Card className="full-width">
                            <Card.Body>
                                <Card.Title>Harvy</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">User</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Card.Link href="#">My Profile</Card.Link>
                            </Card.Body>
                        </Card>
                        <Nav defaultActiveKey="/home" className="flex-column desktop-nav">
                            <NavLink to="/app/"><span className="material-icons">person</span>Profile</NavLink>
                            <NavLink to="/app/stuff"><span className="material-icons">event</span>Calendar</NavLink>
                            <NavLink to="/app/stuff"><span className="material-icons">folder</span>Repository</NavLink>
                        </Nav>
                    </div>
                </Row>
            </nav>
        </Col>
    )
}

export default Sidebar