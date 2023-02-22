import React from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card'

function Source() {

  const sources = useSelector(state => state.user.user.sources)
  const state = useSelector(state => state)

  console.log(state)

  const sourceLister = sources !== undefined && JSON.stringify(sources) !== '[]' ?
    <p>{sources.map((source) => {
      return (
        <div>
            <Card style={{ width: '75rem' }} key={source.id}>
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
    })}</p> : <div><h6>Add some sources!</h6></div>

  return (
    <div>
      <br></br>
    <h3>Sources</h3>
      <br></br>
      {sourceLister}
    </div>    
  )
}

export default Source