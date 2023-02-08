import React from "react";
import Nav from 'react-bootstrap/Nav'

function NavBar() {
return (
  <Nav fill variant="tabs" defaultActiveKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">Home</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/recipe_list">Recipe List</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/create_recipe">Add Recipe</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="source">Source</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="source_recipes">Source Recipes</Nav.Link>
    </Nav.Item>
  </Nav>
)
}

export default NavBar