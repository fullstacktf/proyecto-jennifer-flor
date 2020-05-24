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
      <v-row no-gutters justify="center">
        <v-col cols="5">
          <v-card
            class="d-flex flex-column justify-center"
            :tile="true"
            height="500"
          >
            <v-card-title class="align-self-center"
              >Inicia sesión en GarageMe</v-card-title
            >
            <v-card-text>
              <v-form class="d-flex flex-column px-10">
                <v-text-field
                  v-model="loginCreds.email"
                  label="Correo electrónico"
                ></v-text-field>
                <v-text-field
                  v-model="loginCreds.password"
                  type="password"
                  label="Contraseña"
                ></v-text-field>
                <v-btn
                  outlined
                  color="primary"
                  class="align-self-center"
                  @click="logIn"
                  >Continuar</v-btn
                >
                <v-card-subtitle class="align-self-center mt-1">
                  ¿No tienes una cuenta?
                  <nuxt-link to="/signup">Crea tu cuenta</nuxt-link>.
                </v-card-subtitle>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="d-flex" :tile="true" height="500" :outlined="true">
            <v-img :src="loginImg" aspect-ratio="1.7" cover></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import loginImg from '../assets/login.jpg'
import LogoIcon from '@/components/LogoIcon'

export default {
  name: 'LogIn',
  layout: 'logout',
  components: {
    LogoIcon
  },
  data() {
    return {
      formType: 'login',
      loginCreds: {
        email: null,
        password: null
      },
      loginImg
    }
  },
  methods: {
    ...mapActions('modules/auth', ['attemptLogin']),
    logIn() {
      const token = window.location.hash.replace('#confirmation_token=', '')
      this.attemptLogin({ token, ...this.loginCreds })
        .then(() => {
          window.location.href = '/'
        })
        .catch((err) => {
          console.log('Oops! Looks like something is wrong! ', err)
        })
    }
  },
  head() {
    return {
      title: 'Log In'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
