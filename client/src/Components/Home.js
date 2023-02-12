import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Card from 'react-bootstrap/Card'
import { userLogin, createUser } from "./User/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {

  const state = useSelector(state => state)
  console.log(state)

  const [login, setLogin] = useState(true)
  const [loginStatus, setLoginStatus] = useState(false)
  const [username, setUsername] = useState('')
  const [createUsername, setCreateUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState({})
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [errors, setErrors] = useState('')

  const dispatch = useDispatch()

  const handleFormToggle = (e) => {
    setLogin(!login)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    console.log(e)
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
      try {
        setAddRequestStatus('pending')
        const promiseResult = await dispatch(userLogin({username, password})).unwrap()
      } catch (err) {
        setErrors(err)
      } finally {
        setLoginStatus(true)
        setAddRequestStatus('idle')
        setUsername('')
        setPassword('')
      }
  }

  console.log(errors)

  // Change to ternary and switch between Login and User components?
  const forms = () => {
  if (loginStatus === false) {
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
        onSubmit here with call reference
        <Form onSubmit={handleCreateUser}>
        <Form.Group>
          <br></br>
          <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Username" value={createUsername} onChange={setCreateUsername(e => e.target.value)} />
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
        {/* <Button>Logout, `${state.user}`</Button> */}
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Recipes</Card.Title>
            <Card.Text>
              View Recipes
            </Card.Text>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Create Recipe</Card.Title>
            <Card.Text>
              Add Recipe
            </Card.Text>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Sources</Card.Title>
            <Card.Text>
              View Sources
            </Card.Text>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ width: '18rem'}}>
          {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
          <Card.Body>
            <Card.Title>Create Source</Card.Title>
            <Card.Text>
              Add Source
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

  return (
    <>
      <h3>Welcome to The Cooking Canon!</h3>
      <div>{forms()}</div>
      <br></br>
    </>
  )

  }
export default Home