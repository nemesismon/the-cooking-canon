import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../User/userSlice';
import { kitchenMeasurementTypes } from '../Ingredient/data';
import { useNavigate } from 'react-router-dom';

function NewRecipe() {

  const [name, setName] = useState('')
  const [meal_course, setMealCourse] = useState('')
  const [cook_vessel, setCookVessel] = useState('')
  const [diet_type, setDietType] = useState('')
  const [good_for, setGoodFor] =useState ('')
  const [image, setImage] = useState('')
  const [instructions, setInstructions] = useState('')
  const [notes, setNotes] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [source_id, setSourceID] = useState()
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')
  const [ingName, setIngName] = useState('')
  const [preparation, setPreparation] = useState('')
  const [sourceData, setSourceData] = useState([])

  const dispatch = useDispatch()
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/sources')
    .then(r => r.json())
    .then(data => setSourceData(data))
  }, [])

    const handleAddRecipe = async (e) => {
      e.preventDefault()
      try {
        const recipe = await dispatch(createRecipe({name, meal_course, cook_vessel, diet_type, good_for, image, instructions, ingredients, notes, source_id})).unwrap()
        console.log(recipe)
        if (recipe.id > 0) {
          setName(''); setMealCourse(''); setCookVessel(''); setDietType(''); setGoodFor(''); setImage(''); setInstructions(''); setIngredients(''); setNotes(''); setSourceID();
          navigate('/recipes')
        }
      } 
      catch(err) {
          console.log(err)
    }}

    const sourceSelector = () => {
        const currentSources = sourceData.map(source => 
          <option value={source.id} key={source.id}>{source.author}</option>)

      return (
        <Form.Select aria-label='Default select example' onChange={e => setSourceID(e.target.value)}>
          <option>Select Source</option>
          {currentSources}
        </Form.Select>
      )
    }

    const unitSelector = () => {
      const currentUnit = kitchenMeasurementTypes.map(type => 
        <option value={type.value} key={type.value}>{type.label}</option>)

    return (
      <Form.Select aria-label='Unit select' onChange={e => setUnit(e.target.value)}>
        <option defaultValue=''> Select Source</option>
        {currentUnit}
      </Form.Select>
    )
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
            {unitSelector()}
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
          <Button variant='dark' onClick={() => handleAddIngredient()}>Add Ingredient</Button>
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
          <>&ensp;&ensp;&ensp;<li align='left' key={ingredient.id}>{ingredient.amount} {ingredient.unit} {ingredient.name} {ingredient.preparation}</li></>
        )}) : null

    const errDisplay = JSON.stringify(errors) !== '[]' ? <p className='make_red'>{
      errors.map((error) => {
        return <li key={error}>{error}</li>
      })}</p> : null

    const recipeForm = 
      loginStatus ?
      <div>
        {errDisplay}
        <Form onSubmit={handleAddRecipe}>
          <Form.Group>
            <br></br>
            {sourceSelector()}
            <br></br>
            <FloatingLabel label='Name'>
              <Form.Control type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Meal Course'>
              <Form.Control type='text' placeholder='Meal Course' value={meal_course} onChange={e => setMealCourse(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Cooking Vessel'>
              <Form.Control type='text' placeholder='Cooking Vessel' value={cook_vessel} onChange={e => setCookVessel(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Diet Type'>
              <Form.Control type='text' placeholder='Diet Type' value={diet_type} onChange={e => setDietType(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Good For'>
              <Form.Control type='text' placeholder='Good For' value={good_for} onChange={e => setGoodFor(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <FloatingLabel label='Instructions'>
              <Form.Control type='text' placeholder='Instructions' value={instructions} onChange={e => setInstructions(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <p align='left'><b>&ensp; Ingredients:</b></p>
            {activeIngredients}
            <br></br>
            {ingredientRow()}
            <br></br>
            <FloatingLabel label='Notes'>
              <Form.Control type='text' placeholder='Notes' value={notes} onChange={e => setNotes(e.target.value)} />
            </FloatingLabel>
            <br></br>
            <Button variant='dark' onClick={() => navigate('/recipes')}>Recipes</Button>
            &ensp;<Button variant='dark' type='submit'>Submit</Button>
          </Form.Group>
        </Form>
        <br></br>
      </div> : navigate('/login')

  return (
    <div>
      <br></br>
    <h3>New Recipe</h3>
      <button variant='dark' onClick={() => navigate('/sources/new')}>Need a new Source? - Click here!</button>
      <br></br>
      {recipeForm}
    </div>)
}

export default NewRecipe