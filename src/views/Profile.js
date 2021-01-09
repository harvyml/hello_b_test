import React, { useContext } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col } from "react-bootstrap"

import Dashboard from "./components/Dashboard"
import { UserContext } from "./components/UserContext"


const Profile = () => {
    return <Dashboard board="Profile" component={BoardProfile} />
}

const BoardProfile = () => {
    const user = useContext(UserContext)
    return (
        <div className="profile">
            <Row>
                <Col sm={12} className="center center-text">
                    <h5>Hi {user.name}, this is your profile</h5>
                </Col>
                <Col sm={12} className="center">
                    <ul className="user-info center center-text">
                        <li>{user.name} {user.last_name}</li>
                        <li>{user.email}</li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}



export default Profile;