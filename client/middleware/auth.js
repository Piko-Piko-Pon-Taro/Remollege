export default function({ store, route, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.getters['auth/token'] && route.name !== 'login') {
    return redirect('/login')
  }
}
