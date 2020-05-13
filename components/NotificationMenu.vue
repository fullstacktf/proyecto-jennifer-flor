<template>
  <v-menu offset-y transition="scale-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-badge
          :content="notificationNumber"
          :value="notificationNumber"
          color="secondary"
          overlap
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list v-if="notifications.length > 0" max-width="400" class="pa-1">
      <v-list-item v-for="(item, index) in notifications" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-btn block color="error" @click="clearNotifications">
        <v-icon left>mdi-delete</v-icon>Limpiar todo
      </v-btn>
    </v-list>
  </v-menu>
</template>

<script>
import userData from '@/assets/userdata.json'
export default {
  name: 'NotificationMenu',
  data() {
    return {
      notifications: userData.notifications,
      notificationNumber: userData.notifications.length
    }
  },
  methods: {
    clearNotifications() {
      this.notifications = {}
      this.notificationNumber = 0
    }
  }
}
</script>

<style></style>
