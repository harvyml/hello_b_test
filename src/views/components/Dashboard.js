import React, { useContext } from "react"
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
                        <Col xs={12} sm={5} md={5} lg={5}>
                            <div className="section-title">
                                <h4>{board}</h4>
                            </div>
                        </Col>
                        <Col xs={12} sm={7} md={7} lg={7}>
                            <Nav className="justify-content-end dashboard-nav" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/home">{user.name} {user.last_name}</Nav.Link>
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