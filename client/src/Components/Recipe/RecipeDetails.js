import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
// import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux';
// import { kitchenMeasurementTypes } from '../Ingredient/data';
import { updateRecipe } from '../User/userSlice';

function RecipeDetails({ detailRecipeID }) {

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
  // const [amount, setAmount] = useState('')
  // const [unit, setUnit] = useState('')
  // const [ingName, setIngName] = useState('')
  // const [preparation, setPreparation] = useState('')
  const [sourceData, setSourceData] = useState([])
  const [editToggle, setEditToggle] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)
  const recipes = useSelector(state => state.user.user.recipes)
  const errors = useSelector(state => state.user.errors)

  useEffect(() => {
    fetch('/sources')
    .then(r => r.json())
    .then(data => {
      setSourceData(data)
    })}, [])

  const handleGoBack = () => {
    navigate('/recipes')
  }

  const recipeDetailsBack = () => {
    setEditToggle(false)
  }

  const handleUpdateRecipe = async (e) => {
    e.preventDefault()
    const id = detailRecipeID
    try {
      const recipeUpdate = await dispatch(updateRecipe({id, name, meal_course, cook_vessel, diet_type, good_for, image, instructions, ingredients, notes, source_id})).unwrap()
      console.log(recipeUpdate)
      if (recipeUpdate.length > 0) {
        setName(''); setMealCourse(''); setCookVessel(''); setDietType(''); setGoodFor(''); setImage(''); setInstructions(''); setIngredients([]); setNotes(''); setSourceID();
        setEditToggle(false)
      }
    } 
    catch(err) {
        console.log(err)
  }}

  const sourceSelector = () => {
      const currentSources = sourceData.map(source => 
        <option key={source.author} value={source.id}>{source.author}</option>)
    return (
      <Form.Select onChange={e => setSourceID(e.target.value)}>
        <option>Select Source</option>
        {currentSources}
      </Form.Select>
    )
  }

  // const unitSelector = () => {
  //   const currentUnit = kitchenMeasurementTypes.map(type => 
  //     <option key={type.value} value={type.value} >{type.label}</option>)
  //       return (
  //         <Form.Select aria-label='Unit select' onChange={e => setUnit(e.target.value)}>
  //           <option>Select Source</option>
  //           {currentUnit}
  //         </Form.Select>
  // )
  // }

  // const ingredientRow = () => {
  //   return (
  //     <Container>
  //     <Form.Group>
  //     <Row xs='auto'>
  //       <Col align='left'>
  //         <FloatingLabel label='Amount'>
  //           <Form.Control type='integer' placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />
  //         </FloatingLabel>
  //       </Col>
  //       <Col align='left'>
  //         {unitSelector()}
  //       </Col>
  //       <Col align='left'>
  //         <FloatingLabel label='Ingredient'>
  //           <Form.Control type='text' placeholder='Ingredient' value={ingName} onChange={e => setIngName(e.target.value)} />
  //         </FloatingLabel>
  //       </Col>
  //       <Col align='left'>
  //         <FloatingLabel label='Preparation'>
  //           <Form.Control type='text' placeholder='Preparation' value={preparation} onChange={e => setPreparation(e.target.value)} />
  //         </FloatingLabel>
  //       </Col>
  //       <br></br>
  //       <Button onClick={() => handleAddIngredient()}>Add Ingredient</Button>
  //     </Row>
  //     </Form.Group>
  //     </Container>
  //   )
  // }

  // const handleAddIngredient = () => {
  //   const tempIngObject = {amount: amount, unit: unit, name: ingName, preparation: preparation}
  //   ingredients.push(tempIngObject)
  //   setIngredients([...ingredients])
  //   setAmount(''); setUnit(''); setIngName(''); setPreparation('');
  // }

  const existingIngredients = (exIngred) => {
    return exIngred.length > 0 ?
      exIngred.map(ingred => {
        return (<Col md={{ span: 8, offset: 1 }} align='left'><li key={ingred.name}>{ingred.amount} {ingred.unit} {ingred.name} {ingred.preparation}</li></Col>)
      }) : null
    }

  // const activeIngredients = 
  //   ingredients.length > 0 ? 
  //     ingredients.map(ingredient => { 
  //       return (<Col md={{ span: 8, offset: 1 }} align='left'><li key={ingredient.name}>{ingredient.amount} {ingredient.unit} {ingredient.name} {ingredient.preparation}</li></Col>
  //     )}) : null

  const errDisplay = JSON.stringify(errors) !== '[]' ? <div className='make_red'>{
    errors.map(error => {
      return <li key={error}>{error}</li>
    })}</div> : null

  const handleDetailsEdit = () => {
    if (JSON.stringify(user) !== '{}' && detailRecipeID > 0) {
    return recipes.map(recipe => {
        if (recipe.id === detailRecipeID){
        return editToggle ?
        <div>
          <div>
            <br></br>
            <h3 key={recipe.name}>Editing: {recipe.name}</h3>
          </div> 
          {errDisplay}
          <Form onSubmit={handleUpdateRecipe}>
            <Form.Group>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Source: </Col>
                <Col md={{ span: 8, offset: 0 }}>{sourceSelector()}</Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Name: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.name}>
                  <Form.Control type='text' label='Name' placeholder={recipe.name} value={name} onChange={e => setName(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Meal Course: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.meal_course}>
                    <Form.Control type='text' placeholder={recipe.meal_course} value={meal_course} onChange={e => setMealCourse(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Cooking Vessel: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.cook_vessel}>
                    <Form.Control type='text' label='Cooking Vessel' placeholder={recipe.cook_vessel} value={cook_vessel} onChange={e => setCookVessel(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Diet Type: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.diet_type}>
                    <Form.Control type='text' placeholder={recipe.diet_type} value={diet_type} onChange={e => setDietType(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Good For: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.good_for}>
                    <Form.Control type='text' placeholder={recipe.good_for} value={good_for} onChange={e => setGoodFor(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Instructions: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.instructions}>
                    <Form.Control type='text' placeholder={recipe.instructions} value={instructions} onChange={e => setInstructions(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1 }} align='left'>Notes: </Col>
                <Col md={{ span: 8, offset: 0 }}>
                  <FloatingLabel label={recipe.notes}>
                    <Form.Control type='text' placeholder={recipe.notes} value={notes} onChange={e => setNotes(e.target.value)} />
                  </FloatingLabel>
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col md={{ span: 1, offset: 1}} align='left'>Ingredients: </Col>
                <br></br>
                <Col md={{ span: 12, offset: 1}} align='left'>
                  {existingIngredients(recipe.ingredients)}
                  {/* {activeIngredients} */}
                  {/* <br></br> */}
                  {/* {ingredientRow()} */}
                </Col>
              </Row>
              <br></br>
              <Button variant='dark' onClick={recipeDetailsBack}>Back to Details</Button> &ensp;
              <Button variant='dark' type='submit'>Update</Button>
            </Form.Group>
          </Form>
          <br></br>
        </div> : // <---------------------------- OR IS HERE!!!
            <div>
            <br></br>    
          <h3 key={recipe.name}>{recipe.name}</h3>
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
                <Col align='left'><b>Instructions: </b></Col>
              </Row>
              <Row>
                <Col align='left'>{existingIngredients(recipe.ingredients)}</Col>
                <Col align='left'>&ensp;&ensp;&ensp;{recipe.instructions}</Col>
              </Row>
              <br></br>
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
          <Card.Footer><Button variant='dark' onClick={() => setEditToggle(true)}>Edit</Button></Card.Footer>
        </Card>
        <br></br>
          <Button variant='dark' onClick={handleGoBack}>Back</Button>
        </div>
        }})
      } else {
        navigate('/recipes')
      } 
    }

  return (
    <div>
      {handleDetailsEdit()}
    </div>
  )
}

export default RecipeDetails