import React, { useContext, useEffect, useState } from "react"
import { } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import {BoardCalendar} from "./components/BoardCalendar"

const Calendar = () => {
    return <Dashboard board="Next Month Events" component={BoardCalendar} />
}



export {Calendar, BoardCalendar};