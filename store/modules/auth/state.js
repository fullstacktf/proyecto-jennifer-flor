import GoTrue from 'gotrue-js'

export const auth = new GoTrue({
  APIUrl: 'https://appgarageme.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false
})

const state = () => {
  return {
    currentUser: getSavedState('auth.currentUser'),
    loading: false,
    loggedIn: false,
    token: null
  }
}

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export default state
