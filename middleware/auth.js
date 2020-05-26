// export default function({ store, redirect }) {
//   // If the user is not authenticated
//   if (!store.state.authenticated) {
//     return redirect('/login')
//   }
// }
export default function({ $auth, redirect, req, res, route }) {
  if (window.localStorage.getItem('auth.currentUser') === null) {
    return redirect('/login')
  }
}
