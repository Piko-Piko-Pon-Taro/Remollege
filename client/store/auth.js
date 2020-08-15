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
  login({ commit }, { email, password }) {
    const vm = this
    this.$api
      .post('/auth/login/', {
        email,
        password
      })
      .then((res) => {
        console.log(res)
        commit('updateToken', res.data.token)
        vm.$router.push('/')
      })
  }
}
