const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const fs = require("fs")
const store = require("store2")
const bodyParser = require("body-parser")
const axios = require("axios")
const { getGithubUser, findValueInArray, compare_and_add_key, compare_and_filter, findValueAndReturnKey, findKeyAndRemove } = require("./modules")
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
        res.redirect("/#/app/github?loading=true")
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
    }).then(async snap => {
        var current_favorites = await store("favorite_repos") ? await store("favorite_repos") : []
        //adding a favorite field to the favorite objects for client rendering
        var filtering_favorites = compare_and_add_key(current_favorites, snap.data, "id", "favorite")
        res.json(filtering_favorites)
    }).catch(err => res.json(err))
})

app.get("/user/repos/favorite", async (req, res) => {
    if (!store("github")) {
        res.json({ err: { message: "No access token" } })
    }
    const access_token = await store("github").githubToken.access_token
    await axios.get(`https://api.github.com/user/repos`, {
        headers: {
            Authorization: `token ${access_token}`
        }
    }).then(async snap => {
        var current_favorites = await store("favorite_repos")
        //adding a favorite field to the favorite objects for client rendering
        var filtering_favorites = compare_and_filter(current_favorites, snap.data, "id", "favorite")
        res.json(filtering_favorites)
    }).catch(err => res.json(err))
})

app.get("/favorite", async (req, res) => {
    res.json(await store("favorite_repos"))
})

app.post("/user/add/favorite/repo", async (req, res) => {
    const {repo_id, html_url, repo_name} = req.body
    const user_key = await store.get("currentUser").email
    var verify_if_exists = await findValueInArray(store("favorite_repos"), repo_id, "id")
    if(!verify_if_exists){
        let new_favorite_repo = [{id: repo_id, favorite_by: user_key, repo_name: repo_name, html_url: html_url}]
        await store.add(`favorite_repos`, new_favorite_repo)
        res.json(await store("favorite_repos"))
        return
    }
    res.json({success: false})
})

app.post("/user/delete/favorite/repo", async (req, res) => {
    const {repo_id} = req.body
    const favorite_repos = await store("favorite_repos")
    const key_of_repo_to_delete = await findValueAndReturnKey(favorite_repos, "id", repo_id)
    const removed_element_array = findKeyAndRemove(favorite_repos, key_of_repo_to_delete)
    await store.remove("favorite_repos")
    await store.add("favorite_repos", removed_element_array)
    res.json(await store("favorite_repos"))
    
    
})

module.exports = app