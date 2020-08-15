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
  async signup({ commit }, { name, email, password }) {
    const { token, refreshToken } = await this.$api.post('/auth/signup/', {
      email,
      password,
      name
    })
    commit('updateToken', token)
    console.log(refreshToken)
  },
  async login({ commit }, { email, password }) {
    const { token, refreshToken } = await this.$api.post('/auth/login/', {
      email,
      password
    })
    commit('updateToken', token)
    console.log(refreshToken)
  }
}
