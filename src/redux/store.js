import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/login-slice.js'
import headerTitle from './slices/header-title-slice.js'
export default configureStore({
  reducer: { loginReducer,headerTitle }
})