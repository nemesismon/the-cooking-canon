import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { createSource } from '../User/userSlice';
import { useNavigate } from 'react-router-dom';

function NewSource() {

  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birthday, setBirthday] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errors = useSelector(state => state.user.errors)
  const loginStatus = useSelector(state => state.user.loginStatus)

  const handleSourceSubmit = async (e) => {
    e.preventDefault()
    try{
      await dispatch(createSource({author, email, phone, birthday})).unwrap()
    } catch(err) {
    } finally {
      setAuthor(''); setEmail(''); setPhone(''); setBirthday('');
    }
  }

  const errDisplay = errors !== undefined ? <p className='make_red'>{
    errors.map((error) => {
      return <li key={error}>{error}</li>
    })}</p> : null

  const sourceForm = 
    loginStatus ?
    <div>
      {errDisplay}
      <Form onSubmit={handleSourceSubmit}>
      <Form.Group>
        <br></br>
        <FloatingLabel label='Author'>
          <Form.Control type='text' placeholder='Author' value={author} onChange={e => setAuthor(e.target.value)} />
        </FloatingLabel>
        <br></br>
        <FloatingLabel label='Email'>
          <Form.Control type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        </FloatingLabel>
        <br></br>
        <FloatingLabel label='Phone' >
          <Form.Control type='text' placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
        </FloatingLabel>
        <br></br>
        <FloatingLabel label='Birthday'>
          <Form.Control type='date' placeholder='Birthday' value={birthday} onChange={e => setBirthday(e.target.value)}/>
        </FloatingLabel>
        <br></br>
        <Button type='submit'>Submit</Button>
      </Form.Group>
      </Form>
      <br></br>
      </div> : navigate('/login')


  return (
    <div>
      <br></br>
    <h3>New Source</h3>
      <br></br>
      {sourceForm}
    </div>    
  )

}

export default NewSource