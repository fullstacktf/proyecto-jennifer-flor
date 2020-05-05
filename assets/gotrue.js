import GoTrue from 'gotrue-js'

export const auth = new GoTrue({
  APIUrl: 'https://aparka.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false // If you wish to implement the remember me functionality, set the value to be true.
})
