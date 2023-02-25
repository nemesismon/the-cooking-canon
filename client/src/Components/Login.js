import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from 'react-bootstrap/Form'
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/esm/Button";
import { createUser, userLogin, clearErrors } from './User/userSlice';
import { useNavigate } from "react-router-dom";

function Login() {

  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState({})

  const dispatch = useDispatch()
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)
  const navigate = useNavigate()

  if (loginStatus === true) {
    navigate('/')
  }

  const handleFormToggle = () => {
    dispatch(clearErrors())
    setLogin(!login)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createUser({username, password, password_confirmation, email, phone, birthday})).unwrap()
    } catch(err) {
    } finally {
    }
  }

  const handleUserLogin = async (e) => {
    e.preventDefault()
      try {
        await dispatch(userLogin({username, password})).unwrap()
        } catch (err) {
        } finally {
          setUsername('')
          setPassword('')  
        }
  }

  const userLoginCreate = () => {
      if (login === false) {
        const loginError = errors.length > 0 ? <p className='make_red'>{errors[0].message}</p> : null
        return ( 
          <div>
            <br></br>
            {loginError}
            <Form onSubmit={handleUserLogin}>
            <Form.Group>
              <FloatingLabel label='Username'>
                <Form.Control type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              </FloatingLabel>
              <br></br>
              <FloatingLabel label='Password'>
                <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </FloatingLabel>
              <br></br>
              <Button variant='primary' onClick={handleFormToggle}>Create Account</Button> &ensp;
              <Button variant='primary' type='submit'>Submit</Button>
            </Form.Group>
            </Form>
            <br></br>
            <p>Please Login or Create Account to get started</p>
        </div> 
        )
      } else {
        const createErrors = errors.length > 0 ? <p className='make_red'>{
        errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</p> : null

        return (
          <div>
            {createErrors}
            <Form onSubmit={handleCreateUser}>
            <Form.Group>
              <br></br>
              <FloatingLabel label='Username'>
                <Form.Control type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              </FloatingLabel>
              <br></br>
              <FloatingLabel label='Password'>
                <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
              </FloatingLabel>
              <br></br>
              <FloatingLabel label='Password Confirmation' value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} >
                <Form.Control type='password' placeholder='Password Confirmation' />
              </FloatingLabel>
              <br></br>
              <FloatingLabel label='Email'>
                <Form.Control type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
              </FloatingLabel>
              <br></br>
              <FloatingLabel label='Phone Number'>
                <Form.Control type='text' placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)}/>
              </FloatingLabel>
              <br></br>
              <FloatingLabel label='Birthday'>
                <Form.Control type='date' value={birthday} onChange={e => setBirthday(e.target.value)} />
              </FloatingLabel>
              <br></br>
              <Button variant='primary' onClick={handleFormToggle}>Login</Button> &ensp;
              <Button variant='primary' type='submit'>Submit</Button>
            </Form.Group>
            </Form>
            <br></br>
            <p>Please Login or Create Account to get started</p>
          </div>
        )}
    }
      
  return (
    <>
    <br></br>
    <h3>Login</h3>
    <br></br>
    {userLoginCreate()}
    </>
  )
}

export default Login