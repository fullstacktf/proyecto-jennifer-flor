<template>
  <div>
    <v-form>
      <v-text-field v-model="name" label="Nombre"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Contraseña"
      ></v-text-field>
      <!-- <v-btn color="primary">Iniciar Sesión</v-btn> -->
      <v-btn outlined @click="submit">Registrarse</v-btn>
    </v-form>
  </div>
</template>

<script>
import { auth } from '../assets/gotrue'

export default {
  name: 'LogIn',

  data() {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    submit() {
      event.preventDefault()
      auth
        .signup(this.name, this.password)
        .then((response) =>
          console.log('Confirmation email sent', JSON.stringify(response))
        )
        .catch((error) => console.log("It's an error", error))
    }
  }
}
</script>
