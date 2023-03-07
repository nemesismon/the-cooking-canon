import React from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import '../index.css'

function Home() {
 
  const state = useSelector(state => state.user)
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)
  const navigate = useNavigate()

  // console.log(state.user)
  // console.log(errors)
  // console.log(loginStatus)
  
  const homeMenu = 
    loginStatus ?
     <div>
          <br></br>
          <br></br>
          <Container>
          <Row>
          <Col md={{ span: 1, offset: 2 }}>
          <Card style={{ width: '18rem'}} onClick={() => navigate('/recipes')}>
            <Card.Body>
              <Card.Title>Recipes</Card.Title>
              <Card.Text>
                View Recipes
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col md={{ span: 0, offset: 4 }}>
          <Card style={{ width: '18rem'}} onClick={() => navigate('/recipes/new')}>
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
          <Card style={{ width: '18rem'}} onClick={() => navigate('/sources')}>
            <Card.Body>
              <Card.Title>Sources</Card.Title>
              <Card.Text>
                View Sources
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col md={{ span: 0, offset: 4 }} onClick={() => navigate('/sources/new')}>
          <Card style={{ width: '18rem'}}>
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
          <br></br>
          <br></br>
          <br></br>
      </div> : navigate('/login')

  return (
    <div>
      <br></br>
      <h3>Welcome</h3>
      {homeMenu}
      <br></br>
    </div>
  )

}
export default Home