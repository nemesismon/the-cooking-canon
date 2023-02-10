import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from "react-bootstrap/Navbar"

function NavBar() {

return (
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
  </Navbar>
)
}

export default NavBar