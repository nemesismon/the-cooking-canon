import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from "react-bootstrap/Navbar"
// import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from './User/userSlice';
import { useNavigate } from "react-router-dom";


function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector(state => state.user)
  // const loginStatus = useSelector(state => state.user.loginStatus)

  // Need to get loginStatus fixed here

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

  // const buttonToggle = loginStatus ? 
    // <div> &ensp; <button onClick={handleLogout} variant='secondary'>Logout, {state.user.username}</button></div> : null

  // const navToggle = 
  //   loginStatus ? 

  const theNavBar =
    <Navbar className="justify-content-center" bg="dark" variant="dark">
      <Nav fill variant="tabs" >
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/recipe_list">Recipes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/recipe_form">Add Recipe</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="source">Sources</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="source_form">Add Source</Nav.Link>
        </Nav.Item>
      </Nav>
    {/* {buttonToggle} */}
    </Navbar> 
    // : <NavBar className='justify-content-center' bg='dark' variant='dark'>
    //     <Nav fill variant='tabs'>
    //       <Nav.Item>
    //         <Nav.Link href='/login'>Login</Nav.Link>
    //       </Nav.Item>
    //       <Nav.Item>
    //         <Nav.Link href='/users/new'>Create Account</Nav.Link>
    //       </Nav.Item>
    //     </Nav>
    //     {buttonToggle}
    //   </NavBar>

  return (
    <div>
      {/* {navToggle} */}
      {theNavBar}
    </div>
  )

}

export default NavBar