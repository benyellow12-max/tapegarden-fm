import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: string
}

interface BadgeState {
  badges: Badge[]
  loading: boolean
  error: string | null
}

const initialState: BadgeState = {
  badges: [],
  loading: false,
  error: null,
}

export const badgeSlice = createSlice({
  name: 'badges',
  initialState,
  reducers: {
    setBadges: (state, action: PayloadAction<Badge[]>) => {
      state.badges = action.payload
      state.loading = false
      state.error = null
    },
    addBadge: (state, action: PayloadAction<Badge>) => {
      state.badges.push(action.payload)
    },
    updateBadge: (state, action: PayloadAction<{ id: string; updates: Partial<Badge> }>) => {
      const { id, updates } = action.payload
      const index = state.badges.findIndex(badge => badge.id === id)
      if (index !== -1) {
        state.badges[index] = { ...state.badges[index], ...updates }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setBadges, addBadge, updateBadge, setLoading, setError, clearError } = badgeSlice.actions
export default badgeSlice.reducer