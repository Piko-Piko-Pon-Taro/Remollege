export const state = () => ({
  buildings: []
})

export const getters = {
  all: (state) => state.buildings,
  oneByBuildingId: (state) => (buildingId) =>
    state.buildings.find((b) => b.id === Number(buildingId))
}

export const mutations = {
  setAll(state, { buildings }) {
    state.buildings = buildings
    state.didAllFetched = true
  }
}

export const actions = {
  async fetchByCampusId({ commit }, { campusId }) {
    const { data } = await this.$axios.get(`buildings/campusId/${campusId}`)
    commit('setAll', { buildings: data.buildings })
  }
}
