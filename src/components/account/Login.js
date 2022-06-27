import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert,Container } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { Link, useNavigate  } from "react-router-dom"
import agent from "../../api/agent"
import { login } from "../../features/UserSlice"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate ()
  const dispatch=useDispatch()
  async function handleSubmit(e) {
    e.preventDefault()
    console
    .log(emailRef.current.value)

    try {
      setError("")
      setLoading(true)
     const res= await agent.account.login({email:emailRef.current.value,
        password:passwordRef.current.value,userType:2})
      dispatch(login(res.data))
      //The Method For Login
      navigate("/")
    } catch (e){
        console.log(e)
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (

    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-150" style={{ maxWidth: "400px"  }}></div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
    
    </Container>
  )
}