import React, { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url) => {
    const [state, setState] = useState([])
    useEffect(() => {
        axios.get(url).then(snap => {
            setState(snap.data)
        }).catch(err => setState([]))
    }, [url])


    return state
}

export default useFetch;
