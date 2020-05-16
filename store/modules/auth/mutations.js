const SET_CURRENT_USER = (state, value) => {
  state.currentUser = value
  saveState('auth.currentUser', value)
}

const TOGGLE_LOAD = (state) => {
  state.loading = !state.loading
}

export default {
  SET_CURRENT_USER,
  TOGGLE_LOAD
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}
