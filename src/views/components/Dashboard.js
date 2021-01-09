import React, { useState, useEffect, useContext } from "react"
import { Row, Col, Nav } from "react-bootstrap"
import { UserContext } from "./UserContext"


const Dashboard = ({ board, component }) => {
    const user = useContext(UserContext)
    const Component = component
    return (
        <Row className="dashboard">
            <Col sm={12}>
                <header className="dashboard-header">
                    <Row>
                        <Col sm={5}>
                            <h4 className="title">{board}</h4>
                        </Col>
                        <Col sm={7}>
                            <Nav className="justify-content-end dashboard-nav" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/home">{user.name}</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </header>
            </Col>
            <Col sm={12}>
                <Component />
            </Col>
        </Row>
    )
}

export default Dashboard