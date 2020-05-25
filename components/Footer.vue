<template>
  <v-footer padless height="100">
    <v-row class="justify-space-around">
      <v-col cols="3"
        ><h4>{{ new Date().getFullYear() }} © GarageMe S.L.</h4></v-col
      >
      <v-col cols="3" class="d-flex justify-space-around">
        <nuxt-link v-for="link in links" :key="link" to="/">{{
          link
        }}</nuxt-link>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      links: ['Aviso Legal', 'Política de Privacidad']
    }
  }
}
</script>

<style></style>
