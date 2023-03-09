import React from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function SourceRecipes({ setDetailRecipeID }) {

  const navigate = useNavigate()
  const location = useLocation()
  const currentSource = location.state.source
  const recipes = useSelector(state => state.user.user.recipes)

  const recipeDetails = (recipe) => {
    setDetailRecipeID(recipe.id)
    navigate(`/recipes/${recipe.id}`)
  }

  const recipeLister = () => {
    if (recipes !== undefined) {
    return recipes.map(recipe => {
      if (recipe.source_id === currentSource.id) {
      return (
        <div key={recipe.id}>
          <Card className='mx-auto' style={{ width: '75rem' }}>
          <Card.Body className='hover-effect' onClick={() => recipeDetails(recipe)}>
            <Card.Title>{recipe.name}</Card.Title>
            <Card.Text>
              Good For: {recipe.good_for}; &ensp; Diet: {recipe.diet_type}
            </Card.Text>
          </Card.Body>
        </Card>
        <br></br>
      </div>
    )}
  })
  } return recipes
}

  return (
    <div>
        <br></br>
      <h3>{currentSource.author}'s Recipes</h3>
        <br></br>
        {recipeLister()}
        <Button variant='dark' onClick={() => (navigate('/sources'))}>Back</Button>
    </div>
  )
}

export default SourceRecipes