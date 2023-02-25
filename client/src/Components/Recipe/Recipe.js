import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../User/userSlice';

function Recipe() {

  const user = useSelector(state => state.user.user)
  const loginStatus = useSelector(state => state.user.loginStatus)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const recipeDetails = (recipe) => {
    navigate('/full_recipe', {state:{recipe}})
  }

  const handleRecipeDelete = (recipe) => {
    dispatch(deleteRecipe(recipe))
  }

    const recipeLister = 
      loginStatus ?
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
                <Button variant='primary' onClick={() => handleRecipeDelete(recipe)}>Delete</Button>
              </Card>
              <br></br>
            </div>
          )
        })}</> : <div><h6>Add some recipes!</h6></div>
        : navigate('/login')
        
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