//bootstrap
import React, { useState, useEffect } from "react"
import { Row, Col, Button, Spinner } from "react-bootstrap"

import useFetch from "./hooks/useFetch"
import useGithubUser from "./hooks/useGithubUser"
import { GithubUserView, GithubUserViewProfile } from "./GithubUserView"

const BoardRepos = () => {
    //
    var url = new URL(window.location.href.replace(/#/g, ""));
    var loading_from_server = url.searchParams.get("loading") == "true";
    const repos = useFetch("/github/user/repos")
    const githubUser = useGithubUser()
    const [loading, setLoading] = useState(loading_from_server)
    const [showGitUserView, setShowGitUserView] = useState(false)
    const [message, setMessage] = useState("")
    useEffect(() => {
        if (githubUser.login && repos.length > 0) {
            setShowGitUserView(true)
        } else {
            setShowGitUserView(false)
        }
    }, [githubUser, repos])

    useEffect(() => {
        if (repos.length > 0) {
            setLoading(false)
        } else {
            const timer = setTimeout(() => {
                setLoading(false)
                setMessage("Please check if you are logged and reload the page")
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [repos])

    useEffect(() => {
        if (showGitUserView) {
            setLoading(false)
        }
    }, [repos, showGitUserView])
    return (
        <div className="github-repos">
            <Row>
                <Col sm={12}>
                    <SectionToShow message={message} loading={loading} showGitUserView={showGitUserView} githubUser={githubUser} repos={repos} setLoading={() => setLoading(true)} />
                </Col>
            </Row>
        </div>
    )
}


const SectionToShow = ({ message, loading, showGitUserView, githubUser, repos, setLoading }) => {
    if (!loading && !showGitUserView) {
        return (
            <>
                <div className="center full-width center-text margined-top">
                    <p>{message}</p>
                    <Button href="https://github.com/login/oauth/authorize?client_id=b3f16b580d91a10231bb" onClick={setLoading}>Sign In with github</Button> <span className="grey"></span>
                </div>
            </>
        )
    } else if (showGitUserView) {
        return <GithubUserView githubuser={githubUser} repos={repos} />
    } else if (loading) {
        return (
            <div className="center full-width center-text">
                <Spinner animation="border" />
            </div>
        )
    }
}

const BoardFavoriteRepos = () => {
    const repos = useFetch("/github/user/repos/favorite")
    const githubUser = useGithubUser()
    const [loading, setLoading] = useState(true)
    const [showGitUserView, setShowGitUserView] = useState(false)
    useEffect(() => {
        if (githubUser.login && repos.length > 0) {
            setShowGitUserView(true)
        } else {
            setShowGitUserView(false)
        }
    }, [githubUser, repos])

    useEffect(() => {
        if (showGitUserView) {
            setLoading(false)
        }
    }, [showGitUserView])


    useEffect(() => {
        if (repos.length) {
            setLoading(false)
        } else {
            const timer = setTimeout(() => {
                setLoading(false)
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [repos])


    return (
        <div className="github-repos">
            <Row>
                <Col sm={12}>
                    <div className="center full-width center-text">
                        {loading ? <Spinner animation="border" /> : null}
                    </div>
                    {showGitUserView ? <GithubUserViewProfile githubuser={githubUser} repos={repos} /> : (
                        <div className="margined">
                            <Col sm={12} className="margined-bottom">
                                <span>If you're signed in and you don't see repos here maybe you don't have favorite repos yet</span>
                            </Col>
                            <Button href="/#/app/github" onClick={() => setLoading(true)}>Sign In with github</Button>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    )
}


export { BoardRepos, BoardFavoriteRepos }