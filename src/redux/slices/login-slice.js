import { createSlice } from '@reduxjs/toolkit'
const loginSlice = createSlice({
  name: 'loginStatus',
  initialState: { isLogin: false,data: null },
  reducers: {
    login(state,action) {
      state.isLogin = true
      state.data = action.payload
    },
    logout(state) {
      state.isLogin = false
      state.data = null
    }
  }
})
export const { login,logout } = loginSlice.actions
export default loginSlice.reducer