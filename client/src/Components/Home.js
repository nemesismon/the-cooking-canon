import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { userLogin, createUser, userLogout } from "./User/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
 
  const [login, setLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [createUsername, setCreateUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState({})
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)

  console.log(state)
  console.log(errors)
  console.log(loginStatus)

  const handleFormToggle = () => {
    debugger
    setLogin(!login)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
      try {
        setAddRequestStatus('pending')
        await dispatch(userLogin({username, password})).unwrap()
        } catch (err) {
        } finally {
          setAddRequestStatus('idle')
          setUsername('')
          setPassword('')  
        }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      setAddRequestStatus('pending')
      dispatch(userLogout())
    } catch (err) {
    } finally {
      setAddRequestStatus('idle')
    }
}

  const forms = () => {
    // debugger
  if (loginStatus === false
    ) {
    if (login === true) {
      return ( 
        <div>
            <br></br>
            <Form onSubmit={handleUserLogin}>
            <Form.Group>
              <FloatingLabel label="Username">
                <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </FloatingLabel>
              <br></br>
              <FloatingLabel label="Password">
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </FloatingLabel>
              <br></br>
              <Button variant="primary" type="submit">Submit</Button> &ensp;
              <Button variant="primary" onClick={handleFormToggle}>Create Account</Button>
            </Form.Group>
            </Form>
            <br></br>
            <p>Please Login or Create Account to get started</p>
        </div> 
      )
    } else {
    return (
      <div>
        <Form onSubmit={handleCreateUser}>
        <Form.Group>
          <br></br>
          <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Username" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" value={password} onChange={setPassword(e => e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Password Confirmation" value={passwordConfirmation} onChange={setPasswordConfirmation(e => e.target.value)} >
            <Form.Control type="password" placeholder="Password Confirmation" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Email">
            <Form.Control type="email" placeholder="Email" value={email} onChange={setEmail(e => e.target.value)}/>
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Phone Number">
            <Form.Control type="text" placeholder="Phone Number" value={phone} onChange={setPhone(e => e.target.value)}/>
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Birthday">
            <Form.Control type="date" value={birthday} onChange={setBirthday(e => e.target.value)} />
          </FloatingLabel>
          <br></br>
          <Button variant="primary" type="submit">Submit</Button> &ensp;
          <Button variant="primary" onClick={handleFormToggle}>Login</Button>
        </Form.Group>
        </Form>
        <br></br>
        <p>Please Login or Create Account to get started</p>
      </div>
    )}          
  } else {
    return (
      <div>
        <Button onClick={handleLogout}>Logout {state.user.username}</Button>
        <br></br>
        <br></br>
        <Container>
        <Row>
        <Col md={{ span: 1, offset: 2 }}>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Recipes</Card.Title>
            <Card.Text>
              View Recipes
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col md={{ span: 0, offset: 4 }}>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Create Recipe</Card.Title>
            <Card.Text>
              Add Recipe
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        </Row>
        <br></br>
        <Row>
        <Col md={{ span: 1, offset: 2 }}>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Sources</Card.Title>
            <Card.Text>
              View Sources
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col md={{ span: 0, offset: 4 }}>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Create Source</Card.Title>
            <Card.Text>
              Add Source
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        </Row>
        </Container>
      </div>
    )
  }
}

  return (
    <>
      <h3>Welcome</h3>
      <div>{forms()}</div>
      <br></br>
    </>
  )

  }
export default Home