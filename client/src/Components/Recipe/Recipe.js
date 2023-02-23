import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Recipe() {

  const user = useSelector(state => state.user.user)

  const navigate = useNavigate()

  const recipeDetails = (recipe) => {
    navigate('/full_recipe', {state:{recipe}})
  }

    const recipeLister = 
      JSON.stringify(user) !== '{}' && user.recipes.length > 0 ?
        <>{user.recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
                <Card style={{ width: '75rem' }}>
                {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                <Card.Body onClick={() => recipeDetails(recipe)}>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>
                    Good For: {recipe.good_for}; &ensp; Diet: {recipe.diet_type}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br></br>
            </div>
          )
        })}</> : <div><h6>Add some recipes!</h6></div>
        
  return (
    <div>
      <br></br>
    <h3>Recipe List</h3>
      <br></br>
      {recipeLister}
    </div>    
  )
}

export default Recipe