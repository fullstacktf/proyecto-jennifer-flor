<template>
  <div>
    <h1>Tu perfil</h1>
    <v-card class="my-2 py-2 px-4">
      <h3 class="secondary--text">Información</h3>
      <v-avatar size="164">
        <v-img
          src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
        ></v-img>
      </v-avatar>
      <v-card-title>
        <v-icon small class="mr-1">mdi-account</v-icon>
        {{ userJson.name }} {{ userJson.lastname }}
      </v-card-title>
      <v-card-subtitle>
        <div>
          <v-icon small class="mr-1">mdi-email</v-icon> {{ userJson.email }}
        </div>
        <div>
          <v-icon small class="mr-1">mdi-map-marker</v-icon>
          {{ userJson.location }}
        </div>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer
        ><v-btn depressed color="accent">Editar perfil</v-btn>
      </v-card-actions>
    </v-card>
    <h2 class="d-inline-flex my-4">Actualmente alquilado</h2>
    <v-btn text class="success--text">Modificar Alquiler</v-btn>
    <v-card
      v-if="userJson.actualrental.length > 0"
      flat
      class="d-flex flex-wrap"
    >
      <garage-card
        v-for="(garage, index) in actualRental"
        :key="index"
        :garages="garage"
        class="ma-1"
      ></garage-card
    ></v-card>
    <h2>Alquilados con anterioridad</h2>
    <v-card flat class="d-flex flex-wrap">
      <garage-card
        v-for="(garage, index) in rentalHistory"
        :key="index"
        :garages="garage"
        class="ma-1"
      ></garage-card
    ></v-card>
  </div>
</template>

<script>
import userJson from '../assets/userdata.json'
import garagesJson from '../assets/garages.json'
import GarageCard from '../components/GarageCard.vue'
export default {
  components: {
    GarageCard
  },
  data() {
    return {
      userJson,
      garagesJson
    }
  },
  computed: {
    actualRental() {
      return this.getRentalData(this.userJson.actualrental)
    },
    rentalHistory() {
      return this.getRentalData(this.userJson.historyrental)
    }
  },
  methods: {
    getRentalData(type) {
      const garages = {}
      type.forEach((item, index) => {
        garages[index] = garagesJson.filter((el) => {
          return el.id === item
        })[0]
      })
      return garages
    }
  }
}
</script>

<style></style>
