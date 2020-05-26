const SET_CURRENT_USER = (state, value) => {
  state.currentUser = value
  saveState('auth.currentUser', value)
}

const SET_USER_METADATA = (state, data) => {
  state.userMetada = data
  saveData('userMetadata', data)
}

export default {
  SET_CURRENT_USER,
  SET_USER_METADATA
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

const saveData = (key, state) => {
  window.localStorage.setItem(key, JSON.stringify(state))
}
