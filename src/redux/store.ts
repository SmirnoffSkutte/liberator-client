import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import {reducer as toastrReducer} from 'react-redux-toastr'
import { createWrapper } from 'next-redux-wrapper'
import { balanceSlice } from './balanceSlice'

// config the store 
const store= configureStore({
   reducer: {
      auth: authSlice.reducer,
      balance:balanceSlice.reducer,
      toastr: toastrReducer
   },
})

// export default the store 
export default store

// export the action
export const authActions = authSlice.actions
export const balanceActions = balanceSlice.actions

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const makeStore=()=>store

export const wrapper=createWrapper(makeStore)