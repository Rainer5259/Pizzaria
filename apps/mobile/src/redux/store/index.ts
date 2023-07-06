import {
  ThunkDispatch,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSlice } from '../reducers/auth'
const rootReducer = combineReducers({
  auth: authSlice.reducer
})
const store = configureStore({
  reducer: rootReducer
})
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, undefined, any>>()
export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
