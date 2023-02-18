import React, { useState } from "react";
import Card from 'react-bootstrap/Card'
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../User/userSlice";

function Recipe() {

  const handleFullRecipe = () => {    
  }

  const user = useSelector(state => state.user.user)
  console.log(user)

    const recipeLister =       
      JSON.stringify(user) !== '{}' ?
        <p>{user.recipes.map((recipe) => {
          return (
            <div >
                <Card style={{ width: '75rem' }} key={recipe.id} onClick={() => handleFullRecipe()}>
                {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>
                    Good For: {recipe.good_for},   Diet: {recipe.diet_type}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br></br>
            </div>
          )
        })}</p> : <div><h6>Add some recipes!</h6></div>
        
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