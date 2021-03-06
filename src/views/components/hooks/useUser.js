import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import {UserContext} from "../UserContext"

const useUser = (url = "/api/user") => {
    const [state, setState] = useState({})
    const user = useContext(UserContext)
    useEffect(() => {
        axios.get(url).then(snap => {
            if(snap.data && snap.data.email){
                setState(snap.data)
            }else{
                window.location.href = "/#/signin"
            }
        }).catch(err => setState({}))
    }, [])


    return state
}

export default useUser;