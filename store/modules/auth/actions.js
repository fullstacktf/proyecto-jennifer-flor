import { auth } from './state'

// const init = ({ dispatch }) => {
//   dispatch('validate')
// }

// const validate = ({ commit, state }) => {
//   if (!state.currentUser) return Promise.resolve(null)
//   const user = auth.currentUser()
//   commit('SET_CURRENT_USER', user)
//   return user
// }

const attemptLogin = ({ commit, dispatch }, credentials) => {
  return new Promise((resolve, reject) => {
    dispatch('attemptConfirmation', credentials).then(() => {
      auth
        .login(credentials.email, credentials.password)
        .then((response) => {
          resolve(response)
          commit('SET_CURRENT_USER', response)
        })
        .catch((error) => {
          // No se ha podido iniciar sesión.
          reject(error.json)
        })
    })
  })
}

const attemptConfirmation = ({ commit, dispatch }, credentials) => {
  return new Promise((resolve, reject) => {
    if (!credentials.token) {
      resolve()
      return
    }
    auth
      .confirm(credentials.token)
      .then((response) => {
        credentials.token = null
        dispatch('attemptLogin', credentials)
        // Se ha confirmado el correo correctamente.
        resolve(response)
      })
      .catch((error) => {
        // Error al confirmar el correo.
        reject(error)
      })
  })
}

const attemptSignUp = ({ commit }, credentials) => {
  return new Promise((resolve, reject) => {
    auth
      .signup(credentials.email, credentials.password)
      .then((response) => {
        // Correo de confirmación enviado.
        resolve(response)
        commit('SET_USER_METADATA', credentials.name)
      })
      .catch((error) => {
        // No se ha podido registrar.
        reject(error)
      })
  })
}

const userUpdate = (state) => {
  return new Promise((resolve, reject) => {
    const user = state.currentUser
    user
      .update({ data: { phone: '' } })
      .then((response) => {
        console.log(response)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
        console.log(error)
      })
  })
}

const attemptLogout = ({ commit }) => {
  commit('SET_CURRENT_USER', null)
  // return new Promise((resolve, reject) => {
  //   const user = auth.currentUser()
  //   user
  //     .logout()
  //     .then((response) => {
  //       console.log(response)
  //       resolve(response)
  //       commit('SET_CURRENT_USER', null)
  //     })
  //     .catch((error) => {
  //       reject(error)
  //       console.log('Could not log out', error)
  //     })
  // })
}

export default {
  // init,
  // validate,
  attemptLogin,
  attemptConfirmation,
  attemptSignUp,
  attemptLogout,
  userUpdate
}
