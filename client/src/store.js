import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from './Components/User/userSlice.js'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
}})

export default store