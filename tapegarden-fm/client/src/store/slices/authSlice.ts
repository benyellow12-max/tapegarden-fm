import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@shared/types'
import authService from '../../services/authService'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (userData: {
    email: string
    username: string
    password: string
    displayName: string
  }, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Logout user
export const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
        state.token = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
        state.user = null
        state.token = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer