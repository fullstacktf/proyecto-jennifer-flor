<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>GarageMe</v-toolbar-title>
      <v-spacer></v-spacer>
      <notification-menu></notification-menu>
      <v-btn class="ml-3" outlined nuxt to="/search">
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

export default {
  name: 'NavBar',
  components: {
    NotificationMenu
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
  }
}
</script>

<style></style>
