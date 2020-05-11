<template>
  <v-card max-width="475" class="mx-auto">
    <v-list two-line subheader>
      <v-subheader>General</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Profile photo</v-list-item-title>
          <v-list-item-subtitle
            >Change your Google+ profile photo</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Show your status</v-list-item-title>
          <v-list-item-subtitle
            >Your status is visible to everyone</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader two-line flat>
      <v-subheader>Hangout notifications</v-subheader>

      <v-list-item-group v-model="settings" multiple>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              v-model="active"
              color="primary"
              @click="toggle"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              v-model="active"
              color="primary"
              @click="toggle"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              v-model="active"
              color="primary"
              @click="toggle"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Video sounds</v-list-item-title>
            <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              v-model="active"
              color="primary"
              @click="toggle"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Invites</v-list-item-title>
            <v-list-item-subtitle
              >Notify when receiving invites</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      //   active: false,
      settings: []
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    }
  }
}
</script>

<style></style>
