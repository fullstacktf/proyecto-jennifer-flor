<template>
  <div>
    <v-form>
      <v-text-field v-model="name" label="Nombre"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Contraseña"
      ></v-text-field>
      <v-btn color="primary" @click="submit">Iniciar Sesión</v-btn>
      <v-btn outlined>Registrarse</v-btn>
    </v-form>
  </div>
</template>

<script>
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
      console.log(this.name, this.password)
    }
  }
}
</script>
