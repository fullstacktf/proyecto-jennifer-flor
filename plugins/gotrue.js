import GoTrue from 'gotrue-js'

export default (ctx, inject) => {
  const auth = new GoTrue({
    APIUrl: `${process.env.BASE_URL}/.netlify/identity`,
    audience: '',
    setCookie: false
  })
  ctx.$auth = auth
  inject('auth', auth)
}
