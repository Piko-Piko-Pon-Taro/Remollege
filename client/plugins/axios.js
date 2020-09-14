export default function({ $axios, redirect }) {
  // TODO:
  // - なぜかリダイレクトが機能しない
  $axios.onError((err) => {
    console.log('on error ' + err) // eslint-disable-line
    const code = parseInt(err.response && err.response.status)
    if (code === 401) {
      redirect('/login')
    }
  })
}
