import React, { useContext, useEffect, useState } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col, Button, Tab, ListGroup, Spinner } from "react-bootstrap"


const EventLink = ({ name, id }) => (
    <ListGroup.Item action href={"/#/app/calendar/#" + id}>
        {name}
    </ListGroup.Item>
)
const Event = ({ id, creator, organizer, start, end, status, summary, timeZone, htmlLink, onClick }) => {
    return (
        <Tab.Pane eventKey={"/#/app/calendar/#" + id} >
            <Row>
                <Col sm={9}>
                    <div className="event-info-container">
                        <div className="event-info-title">
                            <h5>{summary}</h5>
                        </div>
                        <div className="event-info">
                            <ul>
                                <li>Starts At: <span className="info-content">{start.dateTime}</span></li>
                                <li>Ends At: <span className="info-content">{end.dateTime}</span></li>
                                <li>Creator: <span className="info-content">{creator.email}</span></li>
                                <li><a href={htmlLink}>see on calendar</a></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col sm={3}>
                    <Button variant="light"><span className="material-icons" action_type="cancel" html_url={htmlLink} event_name={summary} event_id={id} onClick={onClick}>delete</span></Button>
                </Col>
            </Row>
        </Tab.Pane>
    )
}


const EventLinkProfile = ({ name, id }) => (
    <ListGroup.Item action href={"/#/app/profile/#" + id}>
        {name}
    </ListGroup.Item>
)
const EventProfile = ({ id, creator, organizer, start, end, status, summary, timeZone, htmlLink, onClick }) => {
    return (
        <Tab.Pane eventKey={"/#/app/profile/#" + id} >
            <Row>
                <Col sm={9}>
                    <div className="event-info-container">
                        <div className="event-info-title">
                            <h5>{summary}</h5>
                        </div>
                        <div className="event-info">
                            <ul>
                                <li>Starts At: <span className="info-content">{start.dateTime}</span></li>
                                <li>Ends At: <span className="info-content">{end.dateTime}</span></li>
                                <li>Creator: <span className="info-content">{creator.email}</span></li>
                                <li><a href={htmlLink}>see on calendar</a></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col sm={3}>
                    <Button variant="light"><span className="material-icons" action_type="cancel" html_url={htmlLink} event_name={summary} event_id={id} onClick={onClick}>delete</span></Button>
                </Col>
            </Row>
        </Tab.Pane>
    )
}


export {EventLink, Event, EventLinkProfile, EventProfile}