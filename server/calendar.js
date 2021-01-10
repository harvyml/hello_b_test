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
    var today_iso_string = new Date(new Date().getTime()).toISOString()
    var next_month_ms_date = new Date().getTime() + (2.628*(10^9)) //plus one month
    var next_month_iso_date = new Date(next_month_ms_date).toISOString()
    var upcoming_events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: today_iso_string,
        maxResults: 60,
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: "America/Bogota",
        timeMax: next_month_iso_date
    })
    if(upcoming_events){
        response.json(upcoming_events.data)
    }else{
        response.json({err: "no upcoming events"})
    }

}

app.get("/", (req, res) => {
    const {code} = req.query
    res.send(code)
})

app.get("/events", async (req, res) => {
    const {access_token, token_type, refresh_token, expiry_date} = await store("current_google_user").tokens
    let credentials = {
        access_token,
        token_type, // mostly Bearer
        refresh_token,
        expiry_date
    };
    await auth.setCredentials(credentials);
    listEvents(auth, req, res)
})


app.post("/events/delete", async (req, res) => {
    const {eventId, calendarId} = req.body
    let credentials = {
        access_token,
        token_type, // mostly Bearer
        refresh_token,
        expiry_date
    } = await store("current_google_user").tokens;
    auth.setCredentials(credentials);
    axios.delete(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
        params:{
            key: process.env.GOOGLE_API_KEY
        },
        headers:{
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json"
        }
    })
})


module.exports = app
