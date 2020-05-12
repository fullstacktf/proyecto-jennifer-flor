export default function({ $auth, redirect, req, res, route }) {
  if (!$auth.currentUser()) {
    return redirect('/login')
  }
}
