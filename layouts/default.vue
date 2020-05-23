<template>
  <v-app light>
    <nav-bar v-if="currentUser == !null"></nav-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/NavBar'
export default {
  components: {
    NavBar
  },
  // middleware: 'authenticated',
  data() {
    return {}
  },
  created: { ...mapState('modules/auth', ['currentUser']) }
}
</script>
<style>
.theme--light.v-application {
  background: #f5f5f5;
}
</style>
