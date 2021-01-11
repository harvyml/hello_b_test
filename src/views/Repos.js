import React, {  } from "react"
import { } from "react-router-dom"
//bootstrap
import Dashboard from "./components/Dashboard"
import {BoardRepos, BoardFavoriteRepos} from "./components/BoardRepos"
const Repos = () => {
    return <Dashboard board="Github Repositories" component={BoardRepos} />
}

const FavoriteRepos = () => {
    return <Dashboard board="Github Repositories" component={BoardFavoriteRepos} />
}


export {Repos, FavoriteRepos};