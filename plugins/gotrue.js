import GoTrue from 'gotrue-js'

export default (ctx, inject) => {
  const auth = new GoTrue({
    APIUrl: 'https://appgarageme.netlify.app/.netlify/identity',
    audience: '',
    setCookie: false
  })
  ctx.$auth = auth
  inject('auth', auth)
}
