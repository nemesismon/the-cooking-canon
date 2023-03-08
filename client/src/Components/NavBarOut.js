import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'

function NavBarOut({ setLogin }) {

    const nav =
        <div style={{ background: 'black'}}>
        <Col>
          <NavLink to='/login'>
            <Button variant='dark' onClick={() => {setLogin(false)}}>Login</Button>
          </NavLink>
          <NavLink to='/login'>
            <Button variant='dark' onClick={() => {setLogin(true)}}>Create Account</Button>
          </NavLink>
          </Col>
      </div>

  return (
    <div>
      {nav}
    </div>
  )
}

export default NavBarOut