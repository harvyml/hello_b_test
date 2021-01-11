import React, {useState} from "react"
//bootstrap
import {Container, Row, Col, Button, Form, Modal} from "react-bootstrap"
import axios from "axios"
import {NavLink} from "react-router-dom"


const Login = () => {
    const [user, setUser] = useState({email: "", password: ""})
    const [error, setError] = useState(false)
    function updateEmail(e){
        setUser(current => {
            return {
                email: e.target.value,
                password: current.password
            }
        })
    }

    function updatePassword(e){
        setUser(current => {
            return {
                email: current.email,
                password: e.target.value
            }
        })
    }

    function execute_login(e){
        e.preventDefault()
        axios.post("/api/signin", user).then(snap => {
            if(snap.data.email){
                window.location.href = "/#/app"
            }else{
                setError(true)
            }
        }).catch(err => setError(true))
    }

    return (
        <>
        <div className="app">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={4} lg={4} className="margined-top">
                        <Form onSubmit={execute_login}>
                            <Form.Text className="title center-text paddinged"><h4>Sign In</h4></Form.Text>
                            <Form.Text className="text-muted center-text">
                                Sign in to check your Google Calendar and see your github repos!
                            </Form.Text>
                            <Form.Group className="margined-top">
                                <Form.Control placeholder="Email" id="email" type="text" onChange={updateEmail}/>
                                <Form.Control placeholder="Password" id="password" type="password" onChange={updatePassword}/>
                                <Form.Text className="text-muted"><NavLink to="/signup">¿Don't have an account yet? Sign Up here</NavLink></Form.Text>
                                <Button type="submit"variant="dark" className="margined-top" id="submit">Sign in</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ModalError show={error} handleClose={() => setError(false)}/>
        </div>
        </>
    )
}


const ModalError = ({show, handleClose}) => (
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Incorrect email or password</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please check if the felds are correct</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
)

export default Login;