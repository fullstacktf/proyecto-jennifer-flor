<template>
  <div>
    <h1>Tu perfil</h1>
    <v-card class="my-2">
      <v-row>
        <v-col cols="12" md="2">
          <v-avatar size="164">
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" md="10">
          <v-card-title
            >{{ userJson.name }} {{ userJson.lastname }}
          </v-card-title>
          <v-card-subtitle>{{ userJson.email }}</v-card-subtitle>
          <v-card-text>
            <p>{{ userJson.telephone }}</p>
            <p class="subtitle-2">
              {{ userJson.address }} {{ userJson.location }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer><v-btn text>Edit</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="my-2">
      <v-card-title>Actualmente alquilado</v-card-title>
      <garage-card :garages="getActualRental"></garage-card>
    </v-card>
    <v-card class="my-2">
      <v-card-title>
        Alquilados con anterioridad
        <garage-card :garages="getRentalHistory"></garage-card>
      </v-card-title>
    </v-card>
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
    getActualRental() {
      const garage = this.garagesJson.filter((el) => {
        return el.id === this.userJson.actualrental
      })
      return garage[0]
    },
    getRentalHistory() {
      const garages = []
      this.userJson.historyrental.forEach((item) => {
        garagesJson.filter((el) => {
          
        })
        garages.push(item)
      })
      return garages
    }
  }
}
</script>

<style></style>
