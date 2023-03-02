import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

  export const createUser = createAsyncThunk(
    'user/createUser', 
    async (userData) => {
      const response = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
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
      async (loginCredentials) => {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify(loginCredentials),
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
    async (recipeData) => {
      const response = await fetch('/recipes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(recipeData),
      })
      const data = await response.json()
      if (!response.ok){
        throw new Error(data.errors)
      }
      return data
    }
)

export const updateRecipe = createAsyncThunk(
  'user/updateRecipe',
    async (recipeUpdateData) => {
      const response = await fetch('/recipes', {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(recipeUpdateData),
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
    async (sourceData) => {
      const response = await fetch('/sources', {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(sourceData),
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
    },
    deleteRecipe(state, action) {
      fetch(`/recipes/${action.payload.id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json'}
      })
      const recipeIndex = state.user.recipes.findIndex(recipe => recipe.id === action.payload.id)
      state.user.recipes.splice(recipeIndex, recipeIndex + 1)
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
      state.loginStatus = false
      state.errors = []
      state.errors.push(action.error)
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loginStatus = true
      state.user = action.payload
    })
    builder.addCase(userLogout.fulfilled, (state) => {
      state.loginStatus = false
      state.user = {}
      state.errors = []
    })
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.errors = []
      state.user.recipes.push(action.payload)
    })
    builder.addCase(createRecipe.rejected, (state, action) => {
      state.errors = []
      const tempString = action.error.message
      const tempArray = tempString.split(',')
      state.errors = tempArray
    })
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      debugger
      state.errors = []
      state.user.recipes.update()
    })
    builder.addCase(updateRecipe.rejected, (state, action) => {
      // debugger
      state.errors = []
      const tempString = action.error.message
      const tempArray = tempString.split(',')
      state.errors = tempArray
    })
    builder.addCase(createSource.fulfilled, (state, action) => {
      state.errors = []
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

export const { clearErrors, deleteRecipe } = userSlice.actions

export default userSlice.reducer