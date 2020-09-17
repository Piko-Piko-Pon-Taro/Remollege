export const state = () => ({
  buildings: []
})

export const getters = {
  all: (state) => state.buildings
}

export const mutations = {
  setAll(state, { buildings }) {
    state.buildings = buildings
  }
}

export const actions = {
  async fetchByCanmpusId({ state, commit }, { campusId }) {
    if (state.buildings.length > 0) return
    const { data } = await this.$axios.get(`buildings/campusId/${campusId}`)
    commit('setAll', { buildings: data.buildings })
  }
}
