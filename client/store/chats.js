export const state = () => ({
  chats: []
})

export const getters = {
  all: (state) => state.chats
}

export const mutations = {
  reset(state) {
    state.chats = []
  },
  add(state, { chat }) {
    state.chats.push(chat)
  }
}

export const actions = {
  reset({ commit }) {
    commit('reset')
  },
  SOCKET_someOneSendChat({ commit }, { chat }) {
    commit('add', { chat })
  }
}
