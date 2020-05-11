<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon
        v-if="isVisible"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        GarageMe
        <logo-icon color="#fff" class="mr-1"></logo-icon>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <notification-menu v-if="isVisible"></notification-menu>
      <v-btn v-if="isVisible" class="ml-3" outlined nuxt to="/search">
        <v-icon left>mdi-magnify</v-icon>Buscar
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="grey lighten-3">
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          router
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="pa-2">
        <v-btn block color="accent" depressed>Cerrar sesión</v-btn>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import NotificationMenu from '@/components/NotificationMenu'
import LogoIcon from '@/components/LogoIcon'
// import { auth } from '@/assets/gotrue.js'

export default {
  name: 'NavBar',
  components: {
    NotificationMenu,
    LogoIcon
  },
  data() {
    return {
      drawer: false,
      items: [
        { icon: 'mdi-view-dashboard', title: 'Dashboard', to: '/' },
        { icon: 'mdi-account', title: 'Perfil', to: '/profile' },
        { icon: 'mdi-car', title: 'Alquileres', to: '/rent' },
        { icon: 'mdi-cog', title: 'Configuración', to: '/settings' }
      ]
    }
  },
  computed: {
    isVisible() {
      // const user = auth.currentUser()
      // if (!user) {
      //   return false
      // } else {
      //   return true
      // }
      return true
    }
  }
}
</script>

<style></style>
