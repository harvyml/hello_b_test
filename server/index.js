const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()
app.use("/public", express.static("./public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const router = express.Router()


//external
const api = require("./api")
const github = require("./github")
const calendar = require("./calendar")
const calendar_authorization = require("./calendar_authorization")
// const routes = require("./routes")
const html_template = fs.readFileSync("./public/html_template.html", "utf8")

//external modules
// const {isAuth, isAuthRedirect} = require("./modules")
//using api route
// app.use("/", routes)
app.use("/api", api)
app.use("/github", github)
app.use("/calendar/authorize", calendar_authorization)
app.use("/calendar", calendar)
app.use("/", router)

router.get("/", (req, res) => {
    res.send(html_template)
})


app.listen(process.env.PORT || 3000, () => console.log("listening on port 3000"))
