import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from './User/userSlice';
import { useNavigate } from 'react-router-dom';

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
    <div> &ensp; <button onClick={handleLogout} variant='secondary'>Logout, {state.user.username}</button></div> : null

  const nav = 
    <ul class='nav nav-tabs' variant='dark' bg='dark'>
      <li class='nav-item'>
          <a class='nav-link active' aria-current='page' href='/'>Home</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='recipes'>Recipes</a>
      </li>
      <li class='nav-item'> 
        <a class='nav-link' href='recipes/new'>New Recipe</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='sources'>Sources</a>
      </li>
      <li class='nav-item'>
        <a class='nav-link' href='sources/new'>New Source</a>
      </li>
      {buttonToggle}
    </ul>
    // <Navbar className='justify-content-center' bg='dark' variant='dark'>
    //   <Container>
    //   <Nav fill variant='tabs' defaultActiveKey='/'>
    //     <Nav.Item>
    //       <Nav.Link href='/'>Home</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link href='#recipes'>Recipes</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link href='#recipes/new'>New Recipe</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link href='#sources'>Sources</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link href='#sources/new'>New Source</Nav.Link>
    //     </Nav.Item>
    //   </Nav>
    // {buttonToggle}
    // </Container>
    // </Navbar>

  return (
    <div>
      {nav}
    </div>
  )
}

export default NavBar