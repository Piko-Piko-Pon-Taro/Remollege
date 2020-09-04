export default ({ app, route, store }) => {
  app.router.beforeEach(async (to, from, next) => {
    if (to.name === 'login') {
      await store.dispatch('auth/autoLogin')
      if (store.getters['auth/isLogined']) {
        await store.dispatch('auth/fetchCurrentUser')
        next(route.query.prev)
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
