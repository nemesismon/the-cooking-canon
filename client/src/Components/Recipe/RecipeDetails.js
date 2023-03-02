import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux';
import { kitchenMeasurementTypes } from '../Ingredient/data';
import { updateRecipe } from '../User/userSlice';

function RecipeDetails() {

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
  const [editToggle, setEditToggle] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()
  const recipe = location.state.recipe
  const navigate = useNavigate()
  const errors = useSelector(state => state.user.errors)

  console.log(recipe)

  useEffect(() => {
    fetch('/sources')
    .then(r => r.json())
    .then(data => setSourceData(data))
  }, [])

  const handleGoBack = () => {
    navigate('/recipes')
  }

  const recipeDetailsBack = () => {
    setEditToggle(false)
  }

  const handleUpdateRecipe = async (e) => {
    e.preventDefault()
    try {
      const recipe = await dispatch(updateRecipe({name, meal_course, cook_vessel, diet_type, good_for, image, instructions, ingredients, notes, source_id})).unwrap()
      console.log(recipe)
      if (recipe.id > 0) {
        setName(''); setMealCourse(''); setCookVessel(''); setDietType(''); setGoodFor(''); setImage(''); setInstructions(''); setIngredients(''); setNotes(''); setSourceID();
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
      <option>Select Source</option>
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
        <li align='left' key={ingredient.id}>&ensp; &ensp; &ensp; {ingredient.amount} {ingredient.unit} {ingredient.name} {ingredient.preparation}</li>
      )}) : null

  const errDisplay = JSON.stringify(errors) !== '[]' ? <p className='make_red'>{
    errors.map((error) => {
      return <li key={error}>{error}</li>
    })}</p> : null

  const handleDetailsEdit = 
    editToggle ?
    <div>
      {errDisplay}
      <Form onSubmit={handleUpdateRecipe}>
        <Form.Group>
          <br></br>
          {sourceSelector()}
          <br></br>
          <FloatingLabel label='Name'>
            <Form.Control type='text' placeholder={recipe.name} value={name} onChange={e => setName(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label='Meal Course'>
            <Form.Control type='text' placeholder={recipe.meal_course} value={meal_course} onChange={e => setMealCourse(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label='Cooking Vessel'>
            <Form.Control type='text' placeholder={recipe.cook_vessel} value={cook_vessel} onChange={e => setCookVessel(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label='Diet Type'>
            <Form.Control type='text' placeholder={recipe.diet_type} value={diet_type} onChange={e => setDietType(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label='Good For'>
            <Form.Control type='text' placeholder='Good For' value={good_for} onChange={e => setGoodFor(e.target.value)} />
          </FloatingLabel>
          <br></br>
          {/* <FloatingLabel label='Image'>
            <Form.Control type='img' placeholder={recipe.image} value={image} onChange={e => setImage(e.target.value)} />
          </FloatingLabel> */}
          {/* <br></br> */}
          <FloatingLabel label='Instructions'>
            <Form.Control type='text' placeholder={recipe.instructions} value={instructions} onChange={e => setInstructions(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <p align='left'><b>&ensp; Ingredients:</b></p>
          {activeIngredients}
          {ingredientRow()}
          <br></br>
          <FloatingLabel label='Notes'>
            <Form.Control type='text' placeholder={recipe.notes} value={notes} onChange={e => setNotes(e.target.value)} />
          </FloatingLabel>
          <br></br>
          <Button onClick={recipeDetailsBack}>Back to Details</Button> &ensp;
          <Button type='submit'>Update</Button>
        </Form.Group>
      </Form>
      <br></br>
    </div> : 
    <div>
        <br></br>
      <h3>{recipe.name}</h3>
        <br></br>
      <Card className='mx-auto' style={{ width: '75rem' }}>
        <Card.Header>
          <Col align='left'>{recipe.notes}</Col>
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
          <Row>
            <Col align='left'><b>Ingredients: </b></Col>
            <Col align='left'><b>Directions: </b></Col>
          </Row>
          <Row>
            <Col align='left'>Meal Course: {recipe.meal_course}</Col>
            <Col align='left'>Diet Type: {recipe.diet_type}</Col>
          </Row>
          <Row>
            <Col align='left'>Good For: {recipe.good_for}</Col>
            <Col align='left'>Cooking Vessel: {recipe.cook_vessel}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
      <Card.Footer><Button onClick={() => setEditToggle(true)}>Edit</Button></Card.Footer>
    </Card>
    <br></br>
      <Button onClick={handleGoBack}>Back</Button>
    </div>    
  
  return (
    <div>
      {handleDetailsEdit}
    </div>
  )
}

export default RecipeDetails