const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const { } = require("./modules")
const bodyParser = require("body-parser")
const app = express()
const {
    get_user
} = require("./modules")

app.use("/public", express.static("/public/assets"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//get requests
app.get("/user", (req, res) => {
    res.json(req.user)
})

app.get("/err", (req, res) => {
    res.status(400).json({ err: { message: "Error" } })
})
//get user info from another user
app.get("/user/get", (req, res) => {
    get_user(req.query.userId).then(snap => {
        res.json(snap)
    }).catch(err => {
        res.json(err)
    })
})
//session handling
app.post("/login", (req, res) => {
    
})
app.post("/register", (req, res) => {
    
})

app.get("/logout", (req, res) => {
    
    res.redirect("/login")
})




module.exports = app