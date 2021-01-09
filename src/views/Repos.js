import React, { useContext, useEffect, useState } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col, Button, Tab, ListGroup } from "react-bootstrap"

import Dashboard from "./components/Dashboard"
import { UserContext } from "./components/UserContext"
import useFetch from "./components/hooks/useFetch"
import axios from "axios"
import useGithubUser from "./components/hooks/useGithubUser"

const Repos = () => {
    return <Dashboard board="Github Repositories" component={BoardRepos} />
}

const BoardRepos = () => {
    const user = useContext(UserContext)
    const repos = useFetch("/github/user/repos")
    const githubUser = useGithubUser()
    const [showGitUserView, setShowGitUserView] = useState(false)
    useEffect(() => {
        githubUser.login && repos.length > 0 ? setShowGitUserView(true) : setShowGitUserView(false)
        console.log("github from repos: ", githubUser)
    }, [githubUser, repos])
    return (
        <div className="github-repos">
            <Row>
                <Col sm={12}>
                    {showGitUserView ? <GithubUserView githubuser={githubUser} repos={repos} /> : <Button href="https://github.com/login/oauth/authorize?client_id=b3f16b580d91a10231bb">Sign In with github</Button>}
                </Col>
            </Row>
        </div>
    )
}

const GithubUserView = ({ githubuser, repos }) => {
    return (
        <div className="github-user-repos">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {
                                repos.map((repo, i) => <RepoLink name={repo.name} id={repo.id} key={repo.id} />)
                            }
                        </ListGroup>
                    </Col>
                    <Col sm={8}>
                        <Tab.Content>
                            {
                                repos.map((repo, i) => <Repo {...repo} key={i} />)
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}


const RepoLink = ({ name, id }) => (
    <ListGroup.Item action href={"/#/app/github/#" + id}>
        {name}
    </ListGroup.Item>
)
const Repo = ({ id, name, default_branch, html_url, owner, updated_at, pushed_at }) => {
    return (
        <Tab.Pane eventKey={"/#/app/github/#" + id} >
            <Row>
                <Col sm={9}>
                    <div className="repo-info-container">
                        <div className="repo-info-title">
                            <h4>{name}</h4>
                        </div>
                        <div className="repo-info">
                            <ul>
                                <li>Last Push: <span className="info-content">{pushed_at}</span></li>
                                <li>Last update: <span className="info-content">{updated_at}</span></li>
                                <li>Default Branch: <span className="info-content">{default_branch}</span></li>
                                <li><a href={html_url}>See in github</a></li>
                            </ul>
                        </div>
                        <div className="repo-info-title">
                            <h4>Owner</h4>
                        </div>
                        <div className="user-img img-container">
                            <img src={owner.avatar_url}/>
                        </div>
                        <div className="repo-info">
                            <ul>
                                <li>User: <span className="info-content">{owner.login}</span></li>
                                <li>Profile url: <a href={owner.html_url}>{owner.html_url}</a></li>
                            </ul>
                        </div>
                    </div>
                </Col>
                <Col sm={3}>
                    <Button variant="light"><span className="material-icons">favorite_border</span></Button>
                </Col>
            </Row>
        </Tab.Pane>
    )
}


export default Repos;