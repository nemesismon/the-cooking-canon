import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  return fetch('/me') 
  // .then(r => r.json())
  // .then(data => data)
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

export const createUser = () => {
  // createAsyncThunk('user/createUser')
}

export const userLogout = createAsyncThunk(
  'user/userLogout', () => {
      fetch('/logout', {
        method: 'DELETE',
      })
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
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // console.log(action)
      // debugger
      if (action.payload.id !== undefined && action.payload.error !== 'Unauthorized') {
        state.errors = []
        state.loginStatus = true
        state.user = action.payload
      } else {
        state.errors.push(action.payload)
      }
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log('login rejected')
      // action.payload
      // return {...initialState}
    })
    builder.addCase(userLogout.fulfilled, (state, action) => {
      // debugger
      state.loginStatus = false
      state.user = {}
      state.errors = []
    })
    builder.addCase(userLogout.rejected, (state, action) => {
      // debugger
    })
  }
})

export default userSlice.reducer