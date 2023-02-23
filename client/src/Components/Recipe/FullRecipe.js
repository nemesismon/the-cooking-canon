import React from 'react';
import { useLocation } from 'react-router-dom';

function FullRecipe() {

  const location = useLocation()
  const recipe = location.state.recipe

  // debugger

  return (
    <div>
      <br></br>
    <h3>Full Recipe</h3>
      <br></br>

    </div>    
  )
}

export default FullRecipe