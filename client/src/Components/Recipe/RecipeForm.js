import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from 'react-bootstrap/Form'

function RecipeForm() {

  const [name, setName] = useState('')
  const [mealCourse, setMealCourse] = useState('')
  const [cookVessel, setCookVessel] = useState('')
  const [dietType, setDietType] = useState('')
  const [goodFor, setGoodFor] =useState ('')
  const [recipeImage, setRecipeImage] = useState('')
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')
  const [userID, setUserID] = useState(0)
  const [sourceID, setSourceID] = useState(0)

  const recipeForm = () => {
    return (
      <div>
        <Form>
          <Form.Group>
            <FloatingLabel label='Name'>
              <Form.Control type='text' placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Meal Course'>
              <Form.Control type='text' placeholder="Meal Course" value={mealCourse} onChange={e => setMealCourse(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Cooking Vessel'>
              <Form.Control type='text' placeholder="Cooking Vessel" value={cookVessel} onChange={e => setCookVessel(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Diet Type'>
              <Form.Control type='text' placeholder="Diet Type" value={dietType} onChange={e => setDietType(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Good For'>
              <Form.Control type='text' placeholder="Good For" value={goodFor} onChange={e => setGoodFor(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Image'>
              <Form.Control type='img' placeholder="Image" value={recipeImage} onChange={e => setRecipeImage(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Instructions'>
              <Form.Control type='text' placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Notes'>
              <Form.Control type='text' placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            </FloatingLabel>
            <br></br>
            {/* Need auto userID from backend */}
            {/* Select dropdown for source - add option leaves page cancel/ok to source_form */}
          </Form.Group>
        </Form>
        <br></br>
      </div>
    )
  }

  return (
    <div>
      <br></br>
    <h3>Recipe List</h3>
      <br></br>
      {recipeForm()}
    </div>   )
}

export default RecipeForm