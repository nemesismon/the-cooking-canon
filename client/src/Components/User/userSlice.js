import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  export const createUser = createAsyncThunk(
    'user/createUser', 
    async (initialPost) => {
      const response = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(initialPost),
        headers: {'Content-type': 'application/json'}
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.errors)
      }
      return data
    })

  export const fetchUser = createAsyncThunk(
    'user/fetchUser', 
      async () => {
      const response  = await fetch('/me')
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error)
      }
      return data
    })
    
    
  export const userLogin = createAsyncThunk(
    'user/userLogin',
      async (initialPost) => {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify(initialPost),
          headers: {'Content-type': 'application/json'},
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error)
        }
        return data
    })

export const userLogout = createAsyncThunk(
  'user/userLogout', 
    async () => {
      try{
      const response = await fetch('/logout', {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
      })
      return response.json()
    } catch (err) {
      return (err.response.data).json()
    }
})

export const createRecipe = createAsyncThunk(
  'user/createRecipe', 
    async (initialPost) => {
      const response = await fetch('/recipes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(initialPost),
      })
      const data = await response.json()
      if (!response.ok){
        throw new Error(data.errors)
      }
      return data
    }
)

export const createSource = createAsyncThunk(
  'user/createSource', 
    async (initialPost) => {
      const response = await fetch('/sources', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(initialPost),
      })
      const data = await response.json()
      if (!response.ok){
        throw new Error(data.errors)
      }
      return data
    }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    errors: [],
    loginStatus: false
  },
  reducers: {
    clearErrors(state) {
      state.errors = []
    }
  },
  extraReducers(builder) {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loginStatus = true
      state.user = action.payload
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.errors = []
      const tempString = action.error.message
      const tempArray = tempString.split(',')
      state.errors = tempArray
    })
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loginStatus = true
      state.user = action.payload
    })
    builder.addCase(userLogin.rejected, (state, action) => {
      state.errors = []
      state.errors.push(action.error)
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loginStatus = true
      state.user = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      // console.log(action.error)
    })
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loginStatus = false
      state.user = {}
      state.errors = []
    })
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      // state.user.recipes.push
      // debugger
    })
    builder.addCase(createRecipe.rejected, (state, action) => {
      state.errors = []
      const tempString = action.error.message
      const tempArray = tempString.split(',')
      state.errors = tempArray
    })
    builder.addCase(createSource.fulfilled, (state, action) => {
      // debugger
      state.user.sources.push(action.payload)
    })
    builder.addCase(createSource.rejected, (state, action) => {
      state.errors = []
      const tempString = action.error.message
      const tempArray = tempString.split(',')
      state.errors = tempArray
    })
  }
})

export const { clearErrors } = userSlice.actions

export default userSlice.reducer