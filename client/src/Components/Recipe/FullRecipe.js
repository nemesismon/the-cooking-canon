import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

function FullRecipe() {

  const location = useLocation()
  const recipe = location.state.recipe
  const navigate = useNavigate()

  // debugger

  const handleGoBack = () => {
    navigate('/recipe_list')
  }

  return (
    <div>
      <br></br>
    <h4>Full Recipe</h4>
      <br></br>
    <Card style={{ width: '75rem' }}>
      {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
      <Card.Body>
        <Card.Title><h1>Title: {recipe.name}</h1></Card.Title>
        <Card.Text>
          <Stack gap={3}>
            <h3>Meal Course: {recipe.meal_course}</h3>
            <h5>Cooking Vessel: {recipe.cook_vessel}</h5>
            <h5>Diet Type: {recipe.diet_type}</h5>
            <h5>Good For: {recipe.good_for}</h5>
            <h3>Instructions: {recipe.instructions}</h3>
            <h5>Notes: {recipe.notes}</h5>
          </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Button onClick={handleGoBack}>Back</Button>
    </div>    
  )
}

export default FullRecipe