export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async updateAuthUser({}, { user, file }) { // eslint-disable-line
    const formData = new FormData()
    await formData.append('name', user.name)
    await formData.append('profile', user.profile)
    await formData.append('file', file)
    await this.$axios.post(`/users/update/id/${this.$auth.user.id}`, formData)
    this.$auth.fetchUser()
  }
}
