import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Components/User/userSlice"

const store = configureStore({
  reducer: {
    // user to users to match action name in userSlice?
    user: userReducer,
  },
})

export default store