import React, { useContext } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col } from "react-bootstrap"

import Dashboard from "./components/Dashboard"
import { UserContext } from "./components/UserContext"
import { BoardCalendarProfile } from "./components/BoardCalendar"
import { BoardFavoriteRepos } from "./components/BoardRepos"

const Profile = () => {
    return <Dashboard board="Profile" component={BoardProfile} />
}

const BoardProfile = () => {
    const user = useContext(UserContext)
    return (
        <div className="profile">
            <Row>
                <Col sm={12}>
                    <div className="user-info-container margined">
                        <h5>Hi, {user.name}, this is your profile</h5>
                        <ul className="user-info">
                            <li>{user.name} {user.last_name}</li>
                            <li>{user.email}</li>
                        </ul>
                    </div>
                    <div className="divider"></div>
                </Col>
                <Col sm={12} className="margined-top">
                    <div className="section-title center">
                        <h4>Events for next month</h4>
                    </div>
                    <div className="center">
                        <BoardCalendarProfile />
                    </div>
                </Col>
                <Col sm={12} className="margined-top">
                    <div className="divider"></div>
                    <div className="section-title">
                        <h4>Favorite Github Repos</h4>
                    </div>
                    <div className="center margined-top">
                        <BoardFavoriteRepos />
                    </div>
                </Col>
            </Row>
        </div>
    )
}





export default Profile;