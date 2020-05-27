<template>
  <nav>
    <v-app-bar app flat>
      <nuxt-link to="/">
        <v-toolbar-title class="font-weight-black headline">
          GarageMe
          <logo-icon class="ml-1"></logo-icon>
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <notification-menu v-if="isVisible"></notification-menu>
      <v-btn v-if="isVisible" class="ml-3" outlined nuxt to="/search">
        <v-icon left>mdi-magnify</v-icon>Buscar
      </v-btn>
      <v-app-bar-nav-icon
        v-if="isVisible"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app right>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar color="primary">
            <span v-if="userMetadata !== null" class="white--text headline">{{
              letter
            }}</span>
            <span v-else class="white--text headline">G</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="userMetadata !== null">{{
              userMetadata
            }}</v-list-item-title>
            <v-list-item-title v-else>Usuario</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
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
        <v-list-item class="mt-4">
          <v-switch
            v-model="$vuetify.theme.dark"
            color="secondary"
            inset
            label="Modo noche"
            append-icon="mdi-weather-night"
            @change="saveDarkThemeOption"
          ></v-switch>
        </v-list-item>
      </v-list>
      <div class="pa-2">
        <v-btn block color="primary" depressed @click="logOut"
          >Cerrar sesión</v-btn
        >
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NotificationMenu from '@/components/NotificationMenu'
import LogoIcon from '@/components/LogoIcon'

export default {
  name: 'NavBar',
  components: {
    NotificationMenu,
    LogoIcon
  },
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: 'mdi-home', title: 'Inicio', to: '/' },
        { icon: 'mdi-account', title: 'Perfil', to: '/profile' },
        { icon: 'mdi-car', title: 'Reservas', to: '/rent' }
      ]
    }
  },
  computed: {
    ...mapState('modules/auth', ['userMetadata']),
    letter() {
      return this.userMetadata.slice(0, 1)
    },
    isVisible() {
      // const user = this.$auth.currentUser()
      // if (!user) {
      //   return false
      // } else {
      //   return true
      // }
      return true
    }
  },
  created() {
    const darkMode = JSON.parse(localStorage.getItem('dark-mode'))
    darkMode
      ? (this.$vuetify.theme.dark = true)
      : (this.$vuetify.theme.dark = false)
  },
  methods: {
    ...mapActions('modules/auth', ['attemptLogout']),
    logOut() {
      this.attemptLogout()
        .then(() => {
          window.location.href = 'https://garageme.es/'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    saveDarkThemeOption() {
      localStorage.setItem(
        'dark-mode',
        JSON.stringify(this.$vuetify.theme.dark)
      )
    }
  }
}
</script>

<style>
.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #fff !important;
  border-bottom: 2px solid #ccc;
}

.theme--light.v-app-bar.v-toolbar.v-sheet a {
  color: rgba(0, 0, 0, 0.87);
  text-decoration: none;
}

.theme--dark.v-toolbar.v-sheet a {
  color: #fff;
  text-decoration: none;
}

.theme--dark.v-toolbar.v-sheet {
  border-bottom: 2px solid #565656;
}

.theme--light.v-navigation-drawer {
  background-color: #eeeeee !important;
  border-color: #eeeeee;
}
</style>
