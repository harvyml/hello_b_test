import React, { useContext, useEffect, useState } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col, Button, Spinner } from "react-bootstrap"

import useFetch from "./hooks/useFetch"
import { CalendarViewProfile, CalendarView } from "./CalendarView"


const BoardCalendar = () => {
    const [loading, setLoading] = useState(true)
    const events = useFetch("/calendar/events")
    const [showCalendarView, setShowCalendarView] = useState(false)
    
    useEffect(() => {
        if(events.length){
            setShowCalendarView(true)
            setLoading(false)
        }else{
            setShowCalendarView(false)
            const timer = setTimeout(() => {
                setLoading(false)
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [events])

    useEffect(() => {
        if(showCalendarView){
            setLoading(false)
        }
    }, [showCalendarView])

    return (
        <div className="github-events">
            <Row>
                <Col sm={12}>
                    <div className="center full-width center-text">
                        {loading ? <Spinner animation="border" />: null}
                    </div>
                    {showCalendarView ? <CalendarView events={events} /> : (
                        <div className="center full-width center-text margined-top">
                            <Button href="/calendar/authorize/authenticate" onClick={() => setLoading(true)}>Sign In with Google</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}


const BoardCalendarProfile = () => {
    const [loading, setLoading] = useState(true)
    const events = useFetch("/calendar/events")
    const [showCalendarView, setShowCalendarView] = useState(false)
    
    useEffect(() => {
        if(events.length){
            setShowCalendarView(true)
            setLoading(false)
        }else{
            setShowCalendarView(false)
            const timer = setTimeout(() => {
                setLoading(false)
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [events])

    useEffect(() => {
        if(showCalendarView){
            setLoading(false)
        }
    }, [showCalendarView])
    return (
        <div className="github-events">
            <Row>
                <Col sm={12}>
                    <div className="center full-width center-text margined-top">
                        {loading ? <Spinner animation="border" />: null}
                    </div>
                    {showCalendarView ? <CalendarViewProfile events={events} /> : (
                        <div className="margined">
                            <Button href="/calendar/authorize/authenticate" onClick={() => setLoading(true)}>Sign In with Google</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}


export {BoardCalendar, BoardCalendarProfile}