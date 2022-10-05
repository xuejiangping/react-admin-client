import { createSlice } from '@reduxjs/toolkit'
const { reducer,actions } = createSlice({
  name: 'header_title',
  initialState: { title: '首页' },
  reducers: {
    setTitle(state,action) {
      state.title = action.payload
    }
  }
})
export const { setTitle } = actions
export default reducer