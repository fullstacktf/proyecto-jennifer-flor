<template>
  <div>
    <v-card class="d-flex" :tile="true" height="400">
      <v-container>
        <v-bottom-navigation v-model="formType" :grow="true" class="navBar">
          <v-btn value="login">
            <h2>Iniciar Sesión</h2>
          </v-btn>

          <v-btn value="signup">
            <h2>Registrarme</h2>
          </v-btn>
        </v-bottom-navigation>
        <v-card-text>
          <v-form v-if="formType === 'login'">
            <v-text-field
              v-model="loginCreds.email"
              label="Usuario o Correo electrónico"
            ></v-text-field>
            <v-text-field
              v-model="loginCreds.password"
              type="password"
              label="Contraseña"
            ></v-text-field>
            <v-btn outlined color="primary" @click="logIn"
              >Iniciar Sesión</v-btn
            >
          </v-form>
          <v-form v-if="formType === 'signup'">
            <v-text-field
              v-model="signupCreds.email"
              label="Correo electrónico"
            ></v-text-field>
            <v-text-field
              v-model="signupCreds.password"
              type="password"
              label="Contraseña"
            ></v-text-field>
            <v-btn outlined color="primary" @click="signUp">Registrarme</v-btn>
          </v-form>
        </v-card-text>
      </v-container>
      <v-img :src="authImg" aspect-ratio="1.7" cover class="img"></v-img>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import authImg from '../assets/auth.jpg'

export default {
  name: 'LogIn',
  data() {
    return {
      formType: 'login',
      loginCreds: {
        email: null,
        password: null
      },
      signupCreds: {
        email: null,
        password: null
      },
      authImg
    }
  },
  computed: {},
  methods: {
    ...mapActions('modules/auth', ['attemptLogin', 'attemptSignUp']),
    signUp() {
      event.preventDefault()
      this.$auth
        .signup(this.email, this.pass)
        .then((response) =>
          console.log('Confirmation email sent', JSON.stringify(response))
        )
        .catch((error) => console.log("It's an error", error))
    },
    logIn() {
      const token = decodeURIComponent(window.location.search)
        .substring(1)
        .split('confirmation_token=')[1]
      this.attemptLogin({ token, ...this.loginCreds })
        .then(() => {
          // this.handleSuccessfulLogin()
          console.log('You have successfully logged in.')
        })
        .catch((err) => {
          // this.handleUnsuccessfulLogin(err)
          console.log('Oops! Looks like something is wrong! ', err)
        })
    }
  },
  head() {
    return {
      title: 'Login'
    }
  }
}
</script>

<style scoped>
.navBar {
  box-shadow: none;
}
.img {
  flex-basis: 50%;
}
</style>
