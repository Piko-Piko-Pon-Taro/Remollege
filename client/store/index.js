export const state = () => ({
  didAllFetched: false
})

export const getters = {
  breadcrumds: (state, getters) => ({ routeName, routeParams }) => {
    let items = []
    if (routeName === 'index') {
      items = ['早稲田大学', '西早稲田キャンパス']
    } else if (routeName === 'buildings-buildingId') {
      const building = getters['buildings/oneByBuildingId'](
        routeParams.buildingId
      )
      items = building ? ['西早稲田キャンパス', building.name] : []
    } else if (routeName === 'rooms-roomId') {
      const room = getters['rooms/oneByRoomId'](routeParams.roomId)
      const building = getters['buildings/oneByBuildingId'](room.buildingId)
      items = building && room ? [building.name, room.name] : []
    }
    return items
  }
}

export const mutations = {
  fetched(state) {
    state.didAllFetched = true
  }
}

export const actions = {
  async fetchAllData({ state, dispatch, commit }) {
    if (state.didAllFetched) return
    await Promise.all([
      dispatch('buildings/fetchByCampusId', { campusId: 1 }, { root: true }),
      dispatch('rooms/fetchByCampusId', { campusId: 1 }, { root: true })
    ])
    commit('fetched')
  },
  async updateAuthUser({}, { user, file }) { // eslint-disable-line
    const formData = new FormData()
    await formData.append('name', user.name)
    if (user.profile) {
      await formData.append('profile', user.profile)
    }
    await formData.append('file', file)
    await this.$axios.post(`/users/update/id/${this.$auth.user.id}`, formData)
    this.$auth.fetchUser()
  }
}
