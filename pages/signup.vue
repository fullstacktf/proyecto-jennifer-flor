<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2>
            <a href="https://garageme.es"
              >GarageMe
              <logo-icon class="ml-1"></logo-icon>
            </a>
          </h2>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-alert v-if="response === 'success'" dense outlined type="success">
            Se ha registrado correctamente. Le hemos enviado un correo para que
            confirme su cuenta.
          </v-alert>
          <v-alert v-if="response === 'error'" dense outlined type="error">
            Ha ocurrido un error. Por favor, inténtelo otra vez.
          </v-alert>
        </v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="5">
          <v-card
            class="d-flex flex-column justify-center"
            :tile="true"
            height="500"
          >
            <v-card-title class="align-self-center"
              >Crea tu cuenta en GarageMe</v-card-title
            >
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                class="d-flex flex-column px-10"
              >
                <v-text-field
                  v-model="signupCreds.name"
                  :rules="nameRules"
                  label="Nombre"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="signupCreds.email"
                  :rules="emailRules"
                  label="Correo electrónico"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="signupCreds.password"
                  :rules="passwordRules"
                  type="password"
                  label="Contraseña"
                  required
                ></v-text-field>
                <v-btn
                  outlined
                  color="primary"
                  class="align-self-center"
                  @click="signUp"
                  >Registrarme</v-btn
                >
                <v-card-subtitle class="align-self-center mt-1">
                  ¿Ya tienes una cuenta?
                  <nuxt-link to="/login">Inicia sesión</nuxt-link>.
                </v-card-subtitle>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="d-flex" :tile="true" height="500" :outlined="true">
            <v-img :src="signupImg" aspect-ratio="1.7" cover></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import signupImg from '../assets/signup.jpg'
import LogoIcon from '@/components/LogoIcon'

export default {
  name: 'SignUp',
  layout: 'logout',
  components: {
    LogoIcon
  },
  data() {
    return {
      valid: true,
      nameRules: [(v) => !!v || 'Debe indicar su nombre.'],
      emailRules: [
        (v) => !!v || 'Debe indicar su correo electrónico.',
        (v) =>
          /.+@.+\..+/.test(v) ||
          'El formato de correo electrónico no es correcto.'
      ],
      passwordRules: [
        (v) => !!v || 'Debe indicar una contraseña.',
        (v) =>
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(v) ||
          'La contraseña debe tener entre 8 y 16 caracteres, e incluir al menos una mayúscula, una minúscula, un número y un caracter especial.'
      ],
      signupCreds: {
        name: null,
        email: null,
        password: null
      },
      response: null,
      signupImg
    }
  },
  methods: {
    ...mapActions('modules/auth', ['attemptSignUp']),
    signUp() {
      if (this.$refs.form.validate()) {
        this.attemptSignUp(this.signupCreds)
          .then(() => {
            this.response = 'success'
          })
          .catch(() => (this.response = 'error'))
      }
    }
  },
  head() {
    return {
      title: 'Sign Up'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
