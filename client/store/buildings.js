export const state = () => ({
  buildings: [],
  didAllFetched: false
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
  },
  add(state, { building }) {
    state.buildings.push(building)
  }
}

export const actions = {
  async fetchByCampusId({ state, commit }, { campusId }) {
    if (state.didAllFetched) return
    const { data } = await this.$axios.get(`buildings/campusId/${campusId}`)
    commit('setAll', { buildings: data.buildings })
  },
  async fetchByBuildingId({ state, commit }, { buildingId }) {
    if (state.buildings.find((b) => b.id === Number(buildingId))) return
    const { data } = await this.$axios.get(`buildings/${buildingId}`)
    commit('add', { building: data.building })
  }
}
