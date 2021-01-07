import React, { useState, useEffect } from "react"
import { Row, Col, Nav } from "react-bootstrap"


const Dashboard = ({ board, component, user }) => {
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
                                    <Nav.Link href="/home">Harvy</Nav.Link>
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