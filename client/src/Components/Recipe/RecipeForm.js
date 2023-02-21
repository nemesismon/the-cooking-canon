import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../User/userSlice";
import { kitchenMeasurementTypes } from "../Ingredient/data";
import Container from "react-bootstrap/Container";

function RecipeForm() {

  const [name, setName] = useState('')
  const [meal_course, setMealCourse] = useState('')
  const [cook_vessel, setCookVessel] = useState('')
  const [diet_type, setDietType] = useState('')
  const [good_for, setGoodFor] =useState ('')
  const [image, setImage] = useState('')
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [user_id, setUserID] = useState(0)
  const [source_id, setSourceID] = useState(0)
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')
  const [ingName, setIngName] = useState('')
  const [preparation, setPreparation] = useState('')

  console.log(ingredients)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  const recipeForm = () => {

    // const fetchBody - check documentation for format

    const handleAddRecipe = async (e) => {
      e.preventDefault()
      debugger
      try {
        await dispatch(createRecipe({name, meal_course, cook_vessel, diet_type, good_for, image, instructions, ingredients, notes, source_id})).unwrap()
      } catch(err) {
      } finally {
      }
    }

    const sourceSelector = () => {
      if (JSON.stringify(user) !== '{}') {
        const currentSources = user.sources.map(source => 
          <option value={source.id} key={source.id}>{source.author}</option>
        )
      return (
        <Form.Select aria-label="Default select example">
          <option>Select Source</option>
          {currentSources}
        </Form.Select>
      )}
    }

    const ingredientRow = () => {
      return (
        <Container>
        <Form.Group>
        <Row xs='auto'>
          <Col>
            <FloatingLabel label='Amount'>
              <Form.Control type='integer' placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label='Unit'>
              <Form.Control type='text' placeholder='Unit' value={unit} onChange={e => setUnit(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label='Ingredient'>
              <Form.Control type='text' placeholder='Ingredient' value={ingName} onChange={e => setIngName(e.target.value)} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label='Preparation'>
              <Form.Control type='text' placeholder='Preparation' value={preparation} onChange={e => setPreparation(e.target.value)} />
            </FloatingLabel>
          </Col>
          <br></br>
          <Button onClick={() => handleAddIngredient()}>Add Ingredient</Button>
        </Row>
        </Form.Group>
        </Container>
      )
    }

    const handleAddIngredient = () => {
      const tempIngObject = {amount: amount, unit: unit, name: ingName, preparation: preparation}
      ingredients.push(tempIngObject)
      setIngredients([...ingredients])
      setAmount(''); setUnit(''); setIngName(''); setPreparation('');
    }

    const activeIngredients = 
      ingredients.length > 0 ? 
      ingredients.map(ingredient => { 
        return (
          <p align='left' key={ingredient.id}>&ensp; &ensp; &ensp; {ingredient.amount} {ingredient.unit} {ingredient.name} - {ingredient.preparation}</p>
        )}) : null

    return (
      <div>
        <Form onSubmit={handleAddRecipe}>
          <Form.Group>
            <FloatingLabel label='Name'>
              <Form.Control type='text' placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Meal Course'>
              <Form.Control type='text' placeholder="Meal Course" value={meal_course} onChange={e => setMealCourse(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Cooking Vessel'>
              <Form.Control type='text' placeholder="Cooking Vessel" value={cook_vessel} onChange={e => setCookVessel(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Diet Type'>
              <Form.Control type='text' placeholder="Diet Type" value={diet_type} onChange={e => setDietType(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Good For'>
              <Form.Control type='text' placeholder="Good For" value={good_for} onChange={e => setGoodFor(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Image'>
              <Form.Control type='img' placeholder="Image" value={image} onChange={e => setImage(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Instructions'>
              <Form.Control type='text' placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <p align='left'><b>&ensp; Ingredients:</b></p>
            {activeIngredients}
            {ingredientRow()}
            <br></br>
            <FloatingLabel label='Notes'>
              <Form.Control type='text' placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
            </FloatingLabel>
            <br></br>
            {/* Need auto userID from backend */}
            {sourceSelector()}
            <br></br>
            <Button type='submit'>Submit</Button>
          </Form.Group>
        </Form>
        <br></br>
      </div>
    )
  }

  return (
    <div>
      <br></br>
    <h3>Add Recipe</h3>
      <br></br>
      {recipeForm()}
    </div>)
}

export default RecipeForm