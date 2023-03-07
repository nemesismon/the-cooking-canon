import React from 'react';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout, clearErrors } from './User/userSlice';
import { useNavigate, NavLink, Link } from 'react-router-dom';

function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector(state => state.user)
  const loginStatus = useSelector(state => state.user.loginStatus)

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = await dispatch(userLogout()).unwrap()
      if (response.message === 'sessTerm'  || response.error === 'Unauthorized') {
        navigate('/login')
      }
    } catch (err) {
    } finally {
    }
  }

  const buttonToggle = loginStatus ? 
    <Button onClick={handleLogout} variant='dark'>Logout, {state.user.username}</Button> : null

  const nav = 
  <div style={{ background: 'black'}}>
      <Col>
        <NavLink to='/'>
          <Button variant='dark' onClick={() => dispatch(clearErrors())}>Home</Button>
        </NavLink>
        <NavLink to='/recipes'>
          <Button variant='dark' onClick={() => dispatch(clearErrors())}>Recipes</Button>
        </NavLink>
        <NavLink to='/recipes/new'>
          <Button variant='dark' onClick={() => dispatch(clearErrors())}>New Recipe</Button>
        </NavLink>
        <NavLink to='/sources'>
          <Button variant='dark' onClick={() => dispatch(clearErrors())}>Sources</Button>
        </NavLink>
        <NavLink to='/sources/new'>
          <Button variant='dark' onClick={() => dispatch(clearErrors())}>New Source</Button>
        </NavLink>
        &ensp;&ensp;&ensp; {buttonToggle}
        </Col>
    </div>

  return (
    <div>
      {nav}
    </div>
  )
}

export default NavBar