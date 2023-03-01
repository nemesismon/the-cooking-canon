import React from "react"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function NavBarOut({ setLogin }) {

  const handleLoginForm = () => {
    setLogin(true)
  }

    const nav =
      <Navbar className='justify-content-center' bg='dark' variant='dark'>
        <Nav fill variant='tabs'>
          <Nav.Item>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={handleLoginForm}>Create Account</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

  return (
    <div>
      {nav}
    </div>
  )
}

export default NavBarOut