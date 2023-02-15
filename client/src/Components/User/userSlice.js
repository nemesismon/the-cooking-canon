import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser', 
    async () => {
      const response = await fetch('/me') 
  return response.json()
})

export const userLogin = createAsyncThunk(
  'user/userLogin',
    async initialPost => {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(initialPost),
        headers: {'Content-type': 'application/json'},
      })
      return response.json()
    }
)

export const createUser = createAsyncThunk(
    'user/createUser',
    async initialPost => {
      const response = await fetch('/users' , {
        method: 'POST',
        body: JSON.stringify(initialPost),
        headers: {'Content-type': 'application/json'}
      })
      return response.json()
})

export const userLogout = createAsyncThunk(
  'user/userLogout', 
    async () => {
      const response = await fetch('/logout', {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
      })
      return response.json()
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    errors: [],
    loginStatus: false
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      // debugger
      if (action.payload.errors === 0) {
        state.loginStatus = true
        state.user = action.payload
      } else {
        state.errors.push(action.payload)
      }
      
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // tighten up these conditions, id > 0 etc
      if (action.payload.id !== undefined && action.payload.error !== 'Unauthorized') {
        state.errors = []
        state.loginStatus = true
        state.user = action.payload
      } else {
        state.errors.push(action.payload)
      }
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // debugger
      if (action.payload.error !== 'Unauthorized') {
        state.errors = []
        state.loginStatus = true
        state.user = action.payload
      } else {
        state.errors.push(action.payload)
      }
    })
    builder.addCase(userLogout.fulfilled, (state, action) => {
      console.log(action)
      // debugger
      if ((action.payload.message === 'sessTerm' && state.user.id > 0) || action.payload.error === 'Unauthorized') {
      state.loginStatus = false
      state.user = {}
      state.errors = []
      } else {
        state.errors.push(action.payload)
      }
    })
    builder.addCase(userLogout.rejected, (state, action) => {
      console.log(action)
    })
  }
})

export default userSlice.reducer