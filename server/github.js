const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const fs = require("fs")
const store = require("store2")
const bodyParser = require("body-parser")
const axios = require("axios")
const { getGithubUser } = require("./modules")
const app = express()
app.use("/public", express.static("./public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get("/user/authorized", async (req, res) => {
    const { code } = req.query
    if (!code) {
        res.json({ success: false, message: "No code received" })
    }

    axios.post("https://github.com/login/oauth/access_token", {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
    }, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    }).then(async snap => {
        const data = snap.data
        await store({ "github": { githubToken: data } })
        const access_token = await store("github").githubToken.access_token
        let user = await getGithubUser(access_token)
        await store("githubCurrentUser", user)
        res.redirect("/#/app/github")
        res.json(store("githubCurrentUser"))
    })
})


app.get("/user", async (req, res) => {
    if (!store("github")) {
        res.json({ err: { message: "No access token" } })
    }
    let user = await store("githubCurrentUser")
    res.json(user)
})

app.get("/user/repos", async (req, res) => {
    if (!store("github")) {
        res.json({ err: { message: "No access token" } })
    }
    const access_token = await store("github").githubToken.access_token
    await axios.get(`https://api.github.com/user/repos`, {
        headers: {
            Authorization: `token ${access_token}`
        }
    }).then(snap => {
        res.json(snap.data)
    }).catch(err => res.json(err))
})

module.exports = app