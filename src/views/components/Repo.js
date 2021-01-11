import React, {  } from "react"
import { } from "react-router-dom"
//bootstrap
import { Row, Col, Button, Tab, ListGroup } from "react-bootstrap"

const RepoLink = ({ name, id }) => (
    <ListGroup.Item action href={"/#/app/github/#" + id}>
        {name}
    </ListGroup.Item>
)
const Repo = ({ id, name, default_branch, html_url, owner, updated_at, pushed_at, favorite, onClick }) => {
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
                    
                {favorite ? (
                        <Button variant="light" className="btn btn-make-favorite" ><span className="material-icons" action_type="make_not_favorite" html_url={html_url} repo_name={name} repo_id={id} onClick={onClick}>favorite</span></Button>
                        ) : <Button variant="light" className="btn btn-make-favorite" ><span className="material-icons" action_type="make_favorite" html_url={html_url} repo_name={name} repo_id={id} onClick={onClick}>favorite_border</span></Button>
                    }
                </Col>
            </Row>
        </Tab.Pane>
    )
}

const RepoLinkProfile = ({ name, id }) => (
    <ListGroup.Item action href={"/#/app/profile/#" + id}>
        {name}
    </ListGroup.Item>
)
const RepoProfile = ({ id, name, default_branch, html_url, owner, updated_at, pushed_at, favorite, onClick }) => {
    return (
        <Tab.Pane eventKey={"/#/app/profile/#" + id} >
            <Row>
                <Col sm={12}>
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
            </Row>
        </Tab.Pane>
    )
}


export {Repo, RepoLink, RepoProfile, RepoLinkProfile}