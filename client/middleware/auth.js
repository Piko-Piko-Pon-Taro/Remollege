export default function({ store, route, redirect }) {
  // FIXME: リロードする時に一瞬ログイン画面見えるのどうにかしたい
  if (!store.getters['auth/isLogined'] && route.name !== 'login') {
    return redirect(302, '/login', { prev: route.path })
  }
}
