<template>
  <div>
    <v-form>
      <v-text-field
        v-model="user"
        label="Usuario o Correo electrónico"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Contraseña"
      ></v-text-field>
      <v-btn outlined color="primary" @click="logIn">Iniciar Sesión</v-btn>
    </v-form>
    <v-form>
      <v-text-field v-model="email" label="Correo electrónico"></v-text-field>
      <v-text-field
        v-model="pass"
        type="password"
        label="Contraseña"
      ></v-text-field>
      <v-btn outlined color="primary" @click="signUp">Registrarme</v-btn>
    </v-form>
  </div>
</template>

<script>
import { auth } from '../assets/gotrue'

export default {
  name: 'LogIn',
  data() {
    return {
      user: '',
      password: '',
      email: '',
      pass: ''
    }
  },
  methods: {
    signUp() {
      event.preventDefault()
      auth
        .signup(this.email, this.pass)
        .then((response) =>
          console.log('Confirmation email sent', JSON.stringify(response))
        )
        .catch((error) => console.log("It's an error", error))
    },
    logIn() {
      event.preventDefault()
      auth
        .login(this.user, this.password)
        .then((response) => console.log('Loged In', JSON.stringify(response)))
        .catch((error) => console.error('Failed to log in', error))
    }
  },
  head() {
    return {
      title: 'Login'
    }
  }
}
</script>
