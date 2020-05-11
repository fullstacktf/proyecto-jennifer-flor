<template>
  <div>
    <h1>Usuario confirmado</h1>
  </div>
</template>

<script>
import { auth } from '../assets/gotrue'

export default {
  name: 'UserConfirmation',
  mounted() {
    if (
      window.location.hash &&
      window.location.hash.indexOf('#confirmation_token=') === 0
    ) {
      const token = window.location.hash.replace('#confirmation_token=', '')
      auth.confirm(token, true).then(
        (user) => (window.location.href = '/'),
        (error) => console.error('Failed to log in: %o', error)
      )
    }
  },
  head() {
    return {
      title: ''
    }
  }
}
</script>
