import { bindActionCreators, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../client'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  return fetch('/me') 
  .then(r => r.json())
  .then(data => data)
})

export const userLogin = createAsyncThunk(
  'user/userLogin', 
    async initialPost => {
      const response = await http.post('/login', initialPost, { headers: {'Content-type': 'application/json'}})
        console.log(response.data)
        return response.data
    })

export const createUser = (e) => {
  e.preventDefault()
  console.log(e)
  // createAsyncThunk('user/createUser')
}

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  errors: null,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // debugger
      state.user.push(action.payload)
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log(action)
      // debugger
      // action.payload
      state.errors.push(action.error.push(action.message))
    })
  }
})

export default userSlice.reducer