import React from "react";
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from "react-redux";

function Recipe() {
// debugger
  const state = useSelector(state => state.user)

  const recipeLister = state.recipes.length > 0 ? 
  <p>{state.recipes.map((recipe) => {
      <div className="modal show"
        style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header>
            <Modal.Title>{recipe.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>body goes here</p>
            </Modal.Body>
            <Modal.Footer>
              <p>footer here</p>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
        // debugger
  })}</p> : <div><h6>Add some recipes!</h6></div>
  
return (
  <div>
    <br></br>
  <h3>Recipe List</h3>
    <br></br>
  {recipeLister}
  </div>

)}

export default Recipe