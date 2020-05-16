<template>
  <div>
    <h1>Usuario confirmado</h1>
  </div>
</template>

<script>
export default {
  name: 'UserConfirmation',
  mounted() {
    if (
      window.location.hash &&
      window.location.hash.indexOf('#confirmation_token=') === 0
    ) {
      const token = window.location.hash.replace('#confirmation_token=', '')
      this.$auth.confirm(token, true).then(
        (user) => (window.location.href = '/'),
        (error) => console.error('Failed to log in. ', error)
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
