import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { userLogin } from "./User/userSlice";

function Home() {

  const [login, setLogin] = useState(true)
  const [loginStatus, setLoginStatus] = useState(false)

  const handleFormToggle = () => {
    setLogin(!login)
  }

  // Change to ternary and switch between Login and User components?
  const forms = () => {
  if (loginStatus === false) {
    if (login === true) {
      return ( 
        <div>
            <br></br>
            <Form onSubmit={() => userLogin()}>
            <Form.Group>
              <FloatingLabel label="Username">
                <Form.Control type="text" placeholder="Username" />
              </FloatingLabel>
              <br></br>
              <FloatingLabel label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <br></br>
              <Button variant="primary" type="submit">Submit</Button> &ensp;
              <Button variant="primary" onClick={handleFormToggle}>Create Account</Button>
            </Form.Group>
            </Form>
        </div> 
      )
    } else {
    return (
      <div>
        {/* onSubmit here with call reference */}
        <Form >
        <Form.Group>
          <br></br>
          <FloatingLabel label="Username">
            <Form.Control type="text" placeholder="Username" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Passwor Confirmation">
            <Form.Control type="password" placeholder="Password Confirmation" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Email">
            <Form.Control type="email" placeholder="Email" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Phone Number">
            <Form.Control type="text" placeholder="Phone Number" />
          </FloatingLabel>
          <br></br>
          <FloatingLabel label="Date">
            <Form.Control type="date" />
          </FloatingLabel>
          <br></br>
          <Button variant="primary" type="submit">Submit</Button> &ensp;
          <Button variant="primary" onClick={handleFormToggle}>Login</Button>
        </Form.Group>
        </Form>
      </div>
    )}          
  } else {

  }
}

  return (
    <>
      <h3>Welcome to The Cooking Canon!</h3>
      <div>{forms()}</div>
      <br></br>
      <p>Please Login or Create Account to get started</p>
    </>
  )

  }
export default Home