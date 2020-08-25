export const state = () => ({
  rooms: []
})

export const getters = {
  allByBuildingId: (state) => (buildingId) =>
    state.rooms.filter((r) => r.buildingId === buildingId),
  oneByRoomId: (state) => (roomId) => state.rooms.find((r) => r.id === roomId)
}

export const mutations = {
  addMany(state, { rooms }) {
    rooms.forEach((room) => {
      if (state.rooms.find((stateRoom) => stateRoom.id === room.id)) return
      state.rooms.push(room)
    })
  },
  updateOne(state, { room }) {
    let isUpdated = false
    // あれば更新する
    state.rooms = state.rooms.map((stateRoom) => {
      if (stateRoom.id === room.id) {
        isUpdated = true
        return room
      } else {
        return stateRoom
      }
    })
    // なければ追加する
    if (!isUpdated) {
      state.rooms.push(room)
    }
  },
  seatAtTable(state, { roomId, tableId, currentUser }) {
    state.rooms = state.rooms.map((stateRoom) => {
      if (stateRoom.id === roomId) {
        stateRoom.tables = stateRoom.tables.map((stateTable) => {
          if (stateTable.id === tableId) {
            stateTable.users.push(currentUser)
          }
          return stateTable
        })
      }
      return stateRoom
    })
  },
  leaveFromTable(state, { roomId, tableId, currentUser }) {
    state.rooms = state.rooms.map((stateRoom) => {
      if (stateRoom.id === roomId) {
        stateRoom.tables = stateRoom.tables.map((stateTable) => {
          if (stateTable.id === tableId) {
            stateTable.users = stateTable.users.filter(
              (stateUser) => stateUser.id !== currentUser.id
            )
          }
          return stateTable
        })
      }
      return stateRoom
    })
  }
}

export const actions = {
  async fetchByBuildingId({ commit }, { buildingId }) {
    const { data } = await this.$api.get(`rooms/buildingId/${buildingId}`)
    commit('addMany', { rooms: data.rooms })
  },
  async updateByRoomId({ commit }, { roomId }) {
    const { data } = await this.$api.get(`rooms/${roomId}`)
    commit('updateOne', { room: data.room })
  },
  seatAtTable({ commit, rootGetters }, { roomId, tableId }) {
    // TODO: socket.ioでみなさんにも反映させる
    commit('seatAtTable', {
      roomId,
      tableId,
      currentUser: rootGetters['auth/user']
    })
  },
  leaveFromTable({ commit, rootGetters }, { roomId, tableId }) {
    // TODO: socket.ioでみなさんにも反映させる
    commit('leaveFromTable', {
      roomId,
      tableId,
      currentUser: rootGetters['auth/user']
    })
  }
}
