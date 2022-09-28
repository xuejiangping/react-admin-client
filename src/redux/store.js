import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/login-slice.js'

export default configureStore({
  reducer: { loginReducer }

})