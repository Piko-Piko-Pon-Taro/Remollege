export default function({ store, redirect }) {
  // ユーザーが認証されていないとき
  if (!store.getters['auth/token']) {
    return redirect('/login')
  }
}
