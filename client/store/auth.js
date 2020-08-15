export const state = () => ({
  token: null
})

export const getters = {
  token: (state) => state.token
}

export const mutations = {
  updateToken(state, token) {
    state.token = token
  }
}

export const actions = {
  async autoLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token')
    if (!token) return
    const now = new Date()
    const expiryTimeMs = localStorage.getItem('expiryTimeMs')
    const isExpired = now.getTime() >= expiryTimeMs
    const refreshToken = localStorage.getItem('refreshToken')
    if (isExpired) {
      await dispatch('refreshToken', refreshToken)
    } else {
      const expiresInMs = expiryTimeMs - now.getTime()
      setTimeout(() => {
        dispatch(refreshToken)
      }, expiresInMs)
      commit('updateToken', token)
    }
  },
  signup({ dispatch }, { name, email, password }) {
    const vm = this
    this.$api
      .post('/auth/signup/', {
        name,
        email,
        password
      })
      .then((res) => {
        dispatch('setAuthData', res.data)
        vm.$router.push('/')
      })
  },
  login({ dispatch }, { email, password }) {
    const vm = this
    this.$api
      .post('/auth/login/', {
        email,
        password
      })
      .then((res) => {
        dispatch('setAuthData', res.data)
        vm.$router.push('/')
      })
  },
  async refreshToken({ dispatch }, refreshToken) {
    await this.$api
      .get('/auth/refresh/', {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      .then((res) => {
        dispatch('setAuthData', res.data)
      })
  },
  setAuthData({ commit, dispatch }, authData) {
    const now = new Date()
    const expiryTimeMs = now.getTime() + 3600000
    commit('updateToken', authData.token)
    localStorage.setItem('token', authData.token)
    localStorage.setItem('expiryTimeMs', expiryTimeMs)
    localStorage.setItem('refreshToken', authData.refreshToken)
    setTimeout(() => {
      dispatch('refreshToken', authData.refreshToken)
    }, 3600000)
  },
  logout({ commit }) {
    commit('updateToken', null)
    localStorage.removeItem('token')
    localStorage.removeItem('expiryTimeMs')
    localStorage.removeItem('refreshToken')
    this.$router.replace('/login')
  }
}
