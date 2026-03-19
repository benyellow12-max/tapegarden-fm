import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlatformConnection {
  id: string
  platform: 'spotify' | 'lastfm' | 'apple_music'
  connected: boolean
  username?: string
  displayName?: string
  avatar?: string
  lastSync?: string
  error?: string
}

interface PlatformState {
  connections: PlatformConnection[]
  loading: boolean
  error: string | null
}

const initialState: PlatformState = {
  connections: [
    { id: 'spotify', platform: 'spotify', connected: false },
    { id: 'lastfm', platform: 'lastfm', connected: false },
    { id: 'apple_music', platform: 'apple_music', connected: false },
  ],
  loading: false,
  error: null,
}

export const platformSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    setConnections: (state, action: PayloadAction<PlatformConnection[]>) => {
      state.connections = action.payload
      state.loading = false
      state.error = null
    },
    updateConnection: (state, action: PayloadAction<{ platform: string; updates: Partial<PlatformConnection> }>) => {
      const { platform, updates } = action.payload
      const index = state.connections.findIndex(conn => conn.platform === platform)
      if (index !== -1) {
        state.connections[index] = { ...state.connections[index], ...updates }
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
    resetConnections: (state) => {
      state.connections = initialState.connections
    },
  },
})

export const { setConnections, updateConnection, setLoading, setError, clearError, resetConnections } = platformSlice.actions
export default platformSlice.reducer