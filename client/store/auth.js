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
  signup({ commit }, { name, email, password }) {
    const vm = this
    this.$api
      .post('/auth/signup/', {
        name,
        email,
        password
      })
      .then((res) => {
        console.log(res)
        commit('updateToken', res.data.token)
        vm.$router.push('/')
      })
  },
  login({ commit, dispatch }, { email, password }) {
    const vm = this
    this.$api
      .post('/auth/login/', {
        email,
        password
      })
      .then((res) => {
        console.log(res)
        commit('updateToken', res.data.token)
        setTimeout(() => {
          dispatch('refreshToken', res.data.refreshToken)
        }, 3600000)
        vm.$router.push('/')
      })
  },
  refreshToken({ commit, dispatch }, refreshToken) {
    this.$api
      .get('/auth/refresh/', {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      .then((res) => {
        commit('updateToken', res.data.token)
        setTimeout(() => {
          dispatch('refreshToken', res.data.refreshToken)
        }, 3600000)
      })
  }
}
