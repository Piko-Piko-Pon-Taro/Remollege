export default function({ store, redirect }) {
  console.log(store.getters['auth/token'])
  // ユーザーが認証されていないとき
  if (!store.getters['auth/token']) {
    return redirect('/login')
  }
}
