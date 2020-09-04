// TODO:
// - localStorageへの操作を切り出す

export const state = () => ({
  token: null,
  user: {}
})

export const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
  isLogined: (state) => !!state.token
}

export const mutations = {
  updateToken(state, { token }) {
    state.token = token
  },
  deleteToken(state) {
    state.token = null
  },
  updateUser(state, { user }) {
    state.user = user
  },
  deleteUser(state) {
    state.user = {}
  }
}

export const actions = {
  async autoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token')
    const expireAt = localStorage.getItem('expireAt')
    const refreshToken = localStorage.getItem('refreshToken')
    const refreshExpireAt = localStorage.getItem('refreshExpireAt')
    if (!token || !expireAt || !refreshToken || !refreshExpireAt) return
    const now = new Date()
    const isExpired = now.getTime() >= expireAt
    const isRefreshExpired = now.getTime() >= refreshExpireAt
    if (isRefreshExpired) return
    if (isExpired) {
      await dispatch('refreshToken', { refreshToken })
    } else {
      const expiresInMs = expireAt - now.getTime()
      setTimeout(() => {
        dispatch('refreshToken', { refreshToken })
      }, expiresInMs)
      commit('updateToken', { token })
    }
  },
  async signup({ dispatch }, { name, email, password }) {
    const { data } = await this.$api.post('/auth/signup/', {
      name,
      email,
      password
    })
    dispatch('saveTokens', {
      token: data.token,
      refreshToken: data.refreshToken,
      expiresInSec: data.expiresInSec,
      refreshExpiresInSec: data.refreshExpiresInSec
    })
    dispatch('updateCurrentUser')
    this.$router.push('/')
  },
  async login({ dispatch }, { email, password }) {
    const { data } = await this.$api.post('/auth/login/', { email, password })
    dispatch('saveTokens', {
      token: data.token,
      refreshToken: data.refreshToken,
      expiresInSec: data.expiresInSec,
      refreshExpiresInSec: data.refreshExpiresInSec
    })
    dispatch('updateCurrentUser')
    this.$router.push('/')
  },
  async refreshToken({ dispatch }, { refreshToken }) {
    try {
      // TODO: plugin/apiにまとめたい
      const { data } = await this.$api.get('/auth/refresh/', {
        headers: {
          Authorization: `Bearer ${refreshToken}` // TODO: plugin/apiにまとめたい
        }
      })
      dispatch('saveTokens', {
        token: data.token,
        refreshToken: data.refreshToken,
        expiresInSec: data.expiresInSec,
        refreshExpiresInSec: data.refreshExpiresInSec
      })
    } catch (e) {
      await dispatch('logout')
      this.$router.push('/login')
    }
  },
  saveTokens(
    { commit, dispatch },
    { token, refreshToken, expiresInSec, refreshExpiresInSec }
  ) {
    const expiresInMs = expiresInSec * 1000
    const refreshExpiresInMs = refreshExpiresInSec * 1000
    const now = new Date()
    const expireAt = now.getTime() + expiresInMs
    const refreshExpireAt = now.getTime() + refreshExpiresInMs
    commit('updateToken', { token })
    localStorage.setItem('token', token)
    localStorage.setItem('expireAt', expireAt)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('refreshExpireAt', refreshExpireAt)
    setTimeout(() => {
      dispatch('refreshToken', { refreshToken })
    }, expiresInMs)
  },
  logout({ commit }) {
    commit('deleteToken')
    commit('deleteUser')
    localStorage.removeItem('token')
    localStorage.removeItem('expireAt')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshExpireAt')
    this.$router.push('/login')
  },
  fetchCurrentUser({ state, dispatch }) {
    if (Object.keys(state.user).length > 0) return
    dispatch('updateCurrentUser')
  },
  async updateCurrentUser({ commit, getters }) {
    const { data } = await this.$api.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${getters.token}` // TODO: plugin/apiにまとめたい
      }
    })
    const user = data.user
    commit('updateUser', { user })
  },
  async update({ dispatch, getters }, { user, file }) {
    let formData = new FormData()
    await formData.append('id', user.id)
    await formData.append('name', user.name)
    await formData.append('profile', user.profile)
    await formData.append('file', file)
    await this.$api.post(`/users/update/id/${user.id}`, formData, {
      headers: {
        Authorization: `Bearer ${getters.token}` // TODO: plugin/apiにまとめたい
      }
    })
    dispatch('updateCurrentUser')
  }
}
