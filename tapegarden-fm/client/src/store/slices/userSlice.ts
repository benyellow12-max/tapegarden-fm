import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string | null
  username: string | null
  email: string | null
  displayName: string | null
  avatar: string | null
  createdAt: string | null
  lastLogin: string | null
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  displayName: null,
  avatar: null,
  createdAt: null,
  lastLogin: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload }
    },
    clearUser: () => {
      return initialState
    },
    setLastLogin: (state, action: PayloadAction<string>) => {
      state.lastLogin = action.payload
    },
  },
})

export const { setUser, updateUser, clearUser, setLastLogin } = userSlice.actions
export default userSlice.reducer
