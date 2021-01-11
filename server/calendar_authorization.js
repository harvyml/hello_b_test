const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const store = require('store2')
const app = express()

app.use("/public", express.static("/public/assets"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = '../token.json';
const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URIS);

app.get("/authenticate", async (req, res) => {
  const authUrl = await oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl)
})

app.get("/authorized", async (req, res) => {
  const {code} = req.query
  var token = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(token)
  await store("current_google_user", token)
  res.redirect("/#/app/calendar")
})

module.exports = app