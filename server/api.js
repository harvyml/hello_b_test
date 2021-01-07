const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const store = require('store2')
const app = express()
const {
    get_user,
    encrypt_password,
    decrypt_password,
    findUser
} = require("./modules")

app.use("/public", express.static("/public/assets"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//get requests
app.get("/user", (req, res) => {
    res.json(
        store.get("currentUser")
    )
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
app.post("/signin", async (req, res) => {
    const { email, password } = req.body
    // const user = await findUser(store("users"), email)
    compared_password = await decrypt_password(password, user.password)
    if (email == user.email && compared_password) {
        res.json(user)
    }
    res.json({ err: "Incorrect values" })
})
app.post("/signup", async (req, res) => {
    const { email, password } = req.body
    const encrypted_password = await encrypt_password(password)
    console.log(encrypted_password)
    try {
        store.add("users",
            [{
                email: email,
                password: encrypted_password
            }]
        );
        res.json(
            store.get("users")
        )
    } catch (err) {
        res.json(err)
    }
})

app.get("/logout", (req, res) => {
    res.redirect("/login")
})




module.exports = app