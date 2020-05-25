<template>
  <v-app light>
    <nav-bar></nav-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer></Footer>
    <!-- <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  components: {
    NavBar,
    Footer
  },
  // middleware: 'authenticated',
  data() {
    return {}
  }
}
</script>
<style>
.theme--light.v-application {
  background: #f5f5f5;
}
a {
  text-decoration: none;
}
</style>
