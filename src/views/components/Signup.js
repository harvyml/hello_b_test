import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
//bootstrap
import { Container, Row, Col, Button, Form } from "react-bootstrap"
import { password_validate } from "./utils/methods"
import { NavLink } from "react-router-dom"




const SignUp = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_validation, setPasswordValidation] = useState("")

    function validateAndSendDataToServer(e) {
        e.preventDefault()
        let validation = password_validate(password, password_validation)
        if (validation.okay) {
            axios.post("/api/signup", {
                name,
                last_name: lastName,
                email,
                password,
                password_validation
            }).then(snap => {
                snap.data.okay ? window.location.href = "/#/signin" : null
            })
                .catch(err => alert("error: ", err.message))
        } else {
            alert(validation.err.message)
        }
    }

    return (
        <div className="app">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6}>
                        <Form onSubmit={validateAndSendDataToServer}>
                            <Form.Text className="title center-text paddinged margined-top"><h4>Sign Up</h4></Form.Text>
                            <Form.Text className="center-text">
                                Signup to see your github repos and check your google calendar!
                            </Form.Text>
                            <Form.Group className="margined-top">
                                <Form.Control placeholder="name" id="name" type="text" onChange={(e) => setName(e.target.value)} />
                                <Form.Control placeholder="Last name" id="last_name" type="text" onChange={(e) => setLastName(e.target.value)}/>
                                <Form.Control placeholder="Email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Control placeholder="Contraseña" id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            <Form.Control placeholder="Repetir Contraseña" id="password" type="password" onChange={(e) => setPasswordValidation(e.target.value)} />
                            <Form.Text className="text-muted"><NavLink to="/signin">¿Did you already sign up? Sign in here</NavLink></Form.Text>
                            <Button type="submit" variant="dark" className="margined-top" id="submit">Sign Up</Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}




export default SignUp;