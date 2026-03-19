import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import badgeSlice from './slices/badgeSlice'
import platformSlice from './slices/platformSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    badges: badgeSlice,
    platforms: platformSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch