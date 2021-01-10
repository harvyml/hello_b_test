const express = require("express")
const { google } = require("googleapis")
const cors = require("cors")
const dotenv = require("dotenv").config()
const fs = require("fs")
const bodyParser = require("body-parser")
const store = require("store2")
const app = express()
app.use("/public", express.static("./public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const token_file = require("../token.json")
const { default: axios } = require("axios")

const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URIS
);


/**
   * Lists the next 10 events on the user's primary calendar.
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
async function listEvents(auth, req, response) {
    const calendar = google.calendar({ version: 'v3', auth });
    var today_iso_string = new Date().toISOString()
    console.log("today: ", today_iso_string)
    var next_month_ms_date = new Date().getTime() + (2.628 * (10 ** 9)) //plus one month
    var next_month_iso_date = new Date(next_month_ms_date).toISOString()
    console.log("next month: ", next_month_iso_date)
    var upcoming_events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: today_iso_string,
        maxResults: 60,
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: "America/Bogota",
        timeMax: next_month_iso_date
    })
    if (upcoming_events) {
        response.json(upcoming_events.data.items)
    } else {
        response.json({ err: "no upcoming events" })
    }

}

async function calendarId(auth, req, response) {
    const calendar = google.calendar({ version: 'v3', auth });
    var today_iso_string = new Date().toISOString()
    console.log("today: ", today_iso_string)
    var next_month_ms_date = new Date().getTime() + (2.628 * (10 ** 9)) //plus one month
    var next_month_iso_date = new Date(next_month_ms_date).toISOString()
    console.log("next month: ", next_month_iso_date)
    var upcoming_events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: today_iso_string,
        maxResults: 60,
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: "America/Bogota",
        timeMax: next_month_iso_date
    })
    if (upcoming_events) {
        response.json(upcoming_events.data)
    } else {
        response.json({ err: "calendar for this search" })
    }

}

app.get("/", (req, res) => {
    const { code } = req.query
    res.send(code)
})

app.get("/events", async (req, res) => {
    const { access_token, token_type, refresh_token, expiry_date } = await store("current_google_user").tokens
    let credentials = {
        access_token,
        token_type, // mostly Bearer
        refresh_token,
        expiry_date
    };
    await auth.setCredentials(credentials);
    listEvents(auth, req, res)
})

app.get("/calendar", async (req, res) => {
    const { access_token, token_type, refresh_token, expiry_date } = await store("current_google_user").tokens
    let credentials = {
        access_token,
        token_type, // mostly Bearer
        refresh_token,
        expiry_date
    };
    await auth.setCredentials(credentials);
    calendarId(auth, req, res)
})



app.post("/events/cancel", async (req, res) => {
    const { event_id } = req.body
    const {
        access_token,
    } = await store("current_google_user").tokens;
    axios.put(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event_id}`, {
        status: "cancelled",
        start: {
            dateTime: "2021-01-23T12:00:00-05:00"
        },
        end: {
            dateTime: "2021-01-23T13:00:00-05:00"
        } 
    }, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(snap => {
        res.json([...snap.data, {message: "cancelled event"}])
    }).catch(err => res.json(err))
})

app.get("/main", async (req, res) => {
    const {
        access_token
    } = await store("current_google_user").tokens;
    var calendarsList = await axios.get(`https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${process.env.GOOGLE_API_KEY}`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
        }
    })
    res.json(calendarsList.data)
})

module.exports = app
