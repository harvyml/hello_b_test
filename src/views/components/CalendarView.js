import React, { } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col, Button, Tab, ListGroup } from "react-bootstrap"
import axios from "axios"
import {EventLinkProfile, EventProfile, EventLink, Event} from "./Event"


const CalendarView = React.memo(({ events }) => {

    function tabContentClick(e) {
        var action = e.target.getAttribute("action_type")
        if (action == "cancel") {
            var event_id = e.target.getAttribute("event_id")
            axios.post("/calendar/events/cancel", { event_id }).then((snap) => {
                window.location.href = "/#/app/events"
            }).catch(err => alert("There was an error, please reload the page"))
        }
    }
    return (
        <div className="github-user-events">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {
                                events.map((event, i) => <EventLink name={event.summary} id={event.id} key={i} />)
                            }
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content onClick={tabContentClick} className="margined-when-sm">
                            {
                                events.map((event, i) => <Event {...event} key={i} />)
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}, (prevProps, nextProps) => {
    if(prevProps.events.length !== nextProps.events.length){
        return true
    }else{
        return false
    }
})

const CalendarViewProfile = React.memo(({ events }) => {
    return (
        <div className="github-user-events">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {
                                events.map((event, i) => <EventLinkProfile name={event.summary} id={event.id} key={i} />)
                            }
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content className="margined-when-sm">
                            {
                                events.map((event, i) => <EventProfile {...event} key={i} />)
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}, (prevProps, nextProps) => {
    if(prevProps.events.length !== nextProps.events.length){
        return true
    }else{
        return false
    }
})

export {CalendarView, CalendarViewProfile}