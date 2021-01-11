import React, {  } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col, Tab, ListGroup } from "react-bootstrap"

import axios from "axios"
import {Repo, RepoLink, RepoProfile, RepoLinkProfile} from "./Repo"
const GithubUserView = React.memo(({ githubuser, repos }) => {

    function tabContentClick(e){
        var action = e.target.getAttribute("action_type")
        if(action == "make_favorite"){
            var repo_id = e.target.getAttribute("repo_id")
            var repo_name = e.target.getAttribute("repo_name")
            var html_url = e.target.getAttribute("html_url")
            axios.post("/github/user/add/favorite/repo", {repo_id, repo_name, html_url}).then((snap) => {
                e.target.innerHTML = "favorite"
                e.target.setAttribute("action_type", "make_not_favorite")
            }).catch(err => alert("There has been an error, please reload the page"))
        }else if(action == "make_not_favorite"){
            var repo_id = e.target.getAttribute("repo_id")
            axios.post("/github/user/delete/favorite/repo", {repo_id}).then(snap => {
                e.target.innerHTML = "favorite_bordered"
                e.target.setAttribute("action_type", "make_favorite")
            }).catch(err => alert("There has been an error, please reload the page"))
        }
    }
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
                        <Tab.Content onClick={tabContentClick} className="margined-when-sm">
                            {
                                repos.map((repo, i) => <Repo {...repo} key={i} />)
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}, (prevProps, nextProps) => {
    if(prevProps.repos.length !== nextProps.repos.length){
        return true
    }else{
        return false
    }
})

const GithubUserViewProfile = React.memo(({ githubuser, repos }) => {

    function tabContentClick(e){
        var action = e.target.getAttribute("action_type")
        if(action == "make_favorite"){
            var repo_id = e.target.getAttribute("repo_id")
            var repo_name = e.target.getAttribute("repo_name")
            var html_url = e.target.getAttribute("html_url")
            axios.post("/github/user/add/favorite/repo", {repo_id, repo_name, html_url}).then((snap) => {
                window.location.href = "/#/app/profile"
            }).catch(err => alert("There was an error, please reload the page"))
        }
    }
    return (
        <div className="github-user-repos">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {
                                repos.map((repo, i) => <RepoLinkProfile name={repo.name} id={repo.id} key={repo.id} />)
                            }
                        </ListGroup>
                    </Col>
                    <Col xs={12} sm={8} className="margined-when-sm">
                        <Tab.Content onClick={tabContentClick}>
                            {
                                repos.map((repo, i) => <RepoProfile {...repo} key={i} />)
                            }
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    )
}, (prevProps, nextProps) => {
    if(prevProps.repos.length !== nextProps.repos.length){
        return true
    }else{
        return false
    }
})

export {GithubUserView, GithubUserViewProfile}