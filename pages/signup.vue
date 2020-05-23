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
              >Crea tu cuenta en GarageMe</v-card-title
            >
            <v-card-text>
              <v-form class="d-flex flex-column px-10">
                <v-text-field
                  v-model="signupCreds.name"
                  label="Nombre"
                ></v-text-field>
                <v-text-field
                  v-model="signupCreds.email"
                  label="Correo electrónico"
                ></v-text-field>
                <v-text-field
                  v-model="signupCreds.password"
                  type="password"
                  label="Contraseña"
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
  components: {
    LogoIcon
  },
  data() {
    return {
      signupCreds: {
        name: null,
        email: null,
        password: null
      },
      signupImg
    }
  },
  methods: {
    ...mapActions('modules/auth', ['attemptSignUp']),
    signUp() {
      this.attemptSignUp(this.signupCreds)
        .then(() => {
          console.log(
            'You have successfully signed up. Check your email to confirm your account.'
          )
        })
        .catch((error) => console.log(error))
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
