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
  fetchAll({ state, commit }) {
    if (state.buildings.length > 0) return
    const { data } = {
      // TODO: table, api が実装され次第置き換える
      data: {
        buildings: [
          {
            id: 1,
            num: 52
          },
          {
            id: 2,
            num: 53
          },
          {
            id: 3,
            num: 54
          },
          {
            id: 4,
            num: 55
          },
          {
            id: 5,
            num: 56
          },
          {
            id: 6,
            num: 57
          },
          {
            id: 7,
            num: 58
          },
          {
            id: 8,
            num: 59
          },
          {
            id: 9,
            num: 60
          },
          {
            id: 10,
            num: 61
          },
          {
            id: 11,
            num: 62
          },
          {
            id: 12,
            num: 63
          }
        ]
      }
    }
    commit('setAll', { buildings: data.buildings })
  }
}
