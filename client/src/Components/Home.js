import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { userLogout } from './User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import '../index.css'

function Home() {
 
  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)
  const navigate = useNavigate()

  console.log(state.user)
  console.log(errors)
  console.log(loginStatus)
  
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = await dispatch(userLogout()).unwrap()
      debugger
      if (response.message === 'sessTerm'  || response.error === 'Unauthorized') {
        navigate('/login')
      }
    } catch (err) {
    } finally {}
  }
  
  const homeMenu =
    loginStatus ?
    <div>
          <br></br>
          <br></br>
          <Container>
          <Row>
          <Col md={{ span: 1, offset: 2 }}>
          <Card style={{ width: '18rem'}} onClick={() => navigate('/recipe_list')}>
            {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
            <Card.Body>
              <Card.Title>Recipes</Card.Title>
              <Card.Text>
                View Recipes
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col md={{ span: 0, offset: 4 }}>
          <Card style={{ width: '18rem'}} onClick={() => navigate('/recipe_form')}>
            {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
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
          <Card style={{ width: '18rem'}} onClick={() => navigate('/source')}>
            {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
            <Card.Body>
              <Card.Title>Sources</Card.Title>
              <Card.Text>
                View Sources
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col md={{ span: 0, offset: 4 }} onClick={() => navigate('/source_form')}>
          <Card style={{ width: '18rem'}}>
            {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
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
          {/* <br></br> */}
          <Button onClick={handleLogout}>Logout, {state.user.username}</Button>
      </div> : 
      <div>
          <br></br>
          <p><b>Unauthorized</b></p>
          <br></br>
          <Button onClick={() => navigate('/login')}>Login</Button>
      </div>


  return (
    <>
      <br></br>
      <h3>Welcome</h3>
      <div>{homeMenu}</div>
      <br></br>
    </>
  )

}
export default Home