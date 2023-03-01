import React from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card'
import { useNavigate } from "react-router-dom";

function Sources() {

  const sources = useSelector(state => state.user.user.sources)
  const state = useSelector(state => state)
  const loginStatus = useSelector(state => state.user.loginStatus)
  const navigate = useNavigate()

  console.log(state)

  const sourceLister =
    sources !== undefined && JSON.stringify(sources) !== '[]' ?
    <>{sources.map((source) => {
      return (
        <div key={source.id}>
            <Card className='mx-auto' style={{ width: '75rem' }}>
            {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
            <Card.Body>
              <Card.Title>{source.author}</Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
        </div>
      )
    })}</> : <div><h6>Add sources and assign them to recipes to see your list!</h6></div>

  return (
    <div>
      <br></br>
    <h3>Sources</h3>
      <br></br>
      {sourceLister}
    </div>    
  )
}

export default Sources