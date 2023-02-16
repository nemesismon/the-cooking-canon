import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { createUser, fetchUser, userLogin, userLogout, clearErrors } from "./User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import '../index.css'

function Home() {
 
  const [login, setLogin] = useState(true)
  const [fetchRun, setFetchRun] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState({})

  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)

  console.log(state)
  console.log(errors)
  console.log(loginStatus)

  const handleFormToggle = () => {
    dispatch(clearErrors())
    setLogin(!login)
    // debugger
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createUser({username, password, password_confirmation, email, phone, birthday})).unwrap()
    } catch(err) {
      // console.log(err)
    } finally {
      setUsername('')
    }
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
      try {
        await dispatch(userLogin({username, password})).unwrap()
        } catch (err) {
          // console.log(err)
        } finally {
          setUsername('')
          setPassword('')  
        }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      dispatch(userLogout()).unwrap()
    } catch (err) {
      // console.log(err)
    } finally {
    }
}
  
  const forms = () => {
    if (loginStatus === false && fetchRun === false) {
        dispatch(fetchUser()).unwrap()
        setFetchRun(true)
    }

  if (loginStatus === false
    ) {
    if (login === true) {
      // debugger
      const loginError = errors.length > 0 ? <p className="make_red">{errors[0].message}</p> : null
      return ( 
        <div>
            <br></br>
            {loginError}
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
              <Button variant="primary" onClick={handleFormToggle}>Create Account</Button> &ensp;
              <Button variant="primary" type="submit">Submit</Button>
            </Form.Group>
            </Form>
            <br></br>
            <p>Please Login or Create Account to get started</p>
        </div> 
      )
    } else {
      // debugger
    const createErrors = errors.length > 0 ? <div className="make_red">{
      errors.map((error) => {
      return ( <li key={error.id}>{error}</li>
      )})}</div> : null
    return (
      <div>
        {createErrors}
        <Form onSubmit={handleCreateUser}>
        <Form.Group>
          <br></br>
          <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Password Confirmation" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} >
            <Form.Control type="password" placeholder="Password Confirmation" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Email">
            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Phone Number">
            <Form.Control type="text" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}/>
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Birthday">
            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <Button variant="primary" onClick={handleFormToggle}>Login</Button> &ensp;
          <Button variant="primary" type="submit">Submit</Button>
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
      {/* <div>{formError()}</div> */}
      <div>{forms()}</div>
      <br></br>
    </>
  )

  }
export default Home