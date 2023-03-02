import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function SourceRecipes() {

  const location = useLocation()
  const navigate = useNavigate()
  const state = useSelector(state => state)

// WILL REQUIRE CALL TO USERSLICE FOR RECIPES ADDED TO SOURCE PHYSICALLY

  debugger

  const recipeLister = () => {
    const source = location.state.source
    console.log(source)

    debugger
    if (JSON.stringify(source) !== null){
      return source.recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <Card className='mx-auto' style={{ width: '75rem' }}>
              {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
              <Card.Body className='hover-effect' width >
                <Card.Title>{recipe.name}</Card.Title>
                <Card.Text>
                  Good For: {recipe.good_for}; &ensp; Diet: {recipe.diet_type}
                </Card.Text>
              </Card.Body>
            </Card>
            <br></br>
          </div>
  )})}}


  return (
    <div>
        <br></br>
      <h3>### Recipes</h3>
        <br></br>
        {recipeLister}
        <Button onClick={() => navigate('/sources')}>Back</Button>
    </div>
  )
}

export default SourceRecipes