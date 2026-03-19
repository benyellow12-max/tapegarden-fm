import axios from 'axios'
import { User } from '@shared/types'

const API_URL = '/api/auth'

// Register user
const register = async (userData: {
  email: string
  username: string
  password: string
  displayName: string
}): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/register`, userData)
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
    localStorage.setItem('token', response.data.data.token)
  }
  return response.data.data
}

// Login user
const login = async (userData: {
  username: string
  password: string
}): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${API_URL}/login`, userData)
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
    localStorage.setItem('token', response.data.data.token)
  }
  return response.data.data
}

// Get current user
const getMe = async (token: string): Promise<User> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/me`, config)
  return response.data.data
}

// Update user profile
const updateProfile = async (userData: {
  displayName?: string
  bio?: string
  location?: string
  website?: string
}): Promise<User> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/me`, userData, config)
  return response.data.data
}

// Update privacy settings
const updatePrivacySettings = async (settings: {
  showListeningHistory?: boolean
  showTopArtists?: boolean
  showTopGenres?: boolean
  showBadges?: boolean
  publicProfile?: boolean
}): Promise<any> => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${API_URL}/privacy`, settings, config)
  return response.data.data
}

const authService = {
  register,
  login,
  getMe,
  updateProfile,
  updatePrivacySettings,
}

export default authService