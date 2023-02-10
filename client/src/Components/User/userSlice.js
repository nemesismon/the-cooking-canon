import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return fetch('/me') 
  .then(r => r.json())
  .then(data => data)
})

export const userLogin = createAsyncThunk("user/userLogin", async () => {
  return fetch('/login')
  .then(r => r.json())
  .then(data => data)
})

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {},
  reducers: {},
  extraReducers: {
    [fetchUser.pending](state) {
      state.status = "loading"
    },
    [fetchUser.fulfilled](state, action) {
      state.push(action.payload)
      state.status = "idle"
    },
    // Errors?
    [userLogin.pending](state) {
      state.status = "loading"
    },
    [userLogin.fulfilled](state, action) {
      state.push(action.payload)
    }

  }
})

export default userSlice.reducer