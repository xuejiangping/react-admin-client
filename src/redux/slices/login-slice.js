import { createSlice } from '@reduxjs/toolkit'
const loginSlice = createSlice({
  name: 'loginStatus',
  initialState: { value: false },
  reducers: {
    login(state,) {
      state.value = true
    },
    logout(state) {
      state.value = false
    }
  }
})
export const { login,logout } = loginSlice.actions
export default loginSlice.reducer