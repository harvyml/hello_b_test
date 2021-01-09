import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import { UserContext } from "../UserContext"

const useGithubUser = (url = "/github/user") => {
    const [state, setState] = useState({})
    const user = useContext(UserContext)
    useEffect(() => {
        axios.get(url).then(snap => {
            console.log(snap.data)
            setState(snap.data)
        }).catch(err => setState({}))
        setState(user)
    }, [])


    return state
}

export default useGithubUser;