<template>
  <div light>
    <h1 class="mt-4 display-2 text-center">¡Hola, {{ userData.name }}!</h1>
    <v-card class="my-10 mx-auto" max-width="900">
      <v-card-title class="headline font-weight-bold text-uppercase"
        >Sobre tu próxima reserva</v-card-title
      >
      <v-card-subtitle
        >Recuerda hacer Check-In al llegar a tu aparcamiento</v-card-subtitle
      >
      <v-divider></v-divider>
      <v-list color="grey lighten-4">
        <v-list-item>
          <v-img
            :src="parkingimg"
            max-height="100"
            max-width="100"
            class="mx-10"
          ></v-img>
          <div class="d-flex flex-column flex-md-row">
            <v-list-item-content>
              <v-list-item-title class="text-uppercase title"
                >Inicio</v-list-item-title
              >
              <v-list-item-subtitle class="subtitle-1">{{
                nextBookingGarage.startDate
              }}</v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1">{{
                nextBookingGarage.startTime
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title class="text-uppercase title"
                >Fin</v-list-item-title
              >
              <v-list-item-subtitle class="subtitle-1">{{
                nextBookingGarage.endDate
              }}</v-list-item-subtitle>
              <v-list-item-subtitle class="subtitle-1">{{
                nextBookingGarage.endTime
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </div>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" text nuxt to="/rent">Ver mis reservas</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed>Check-In</v-btn>
      </v-card-actions>
    </v-card>
    <h2>Aparcamientos cerca de ti</h2>
    <v-card
      max-width="400"
      flat
      class="ma-4 mx-auto d-flex flex-column align-center"
    >
      <v-card-title class="text-uppercase font-weight-medium title">
        Tu ubicación actual
        <v-btn small depressed outlined class="ml-2">
          <v-icon small>mdi-pencil-outline</v-icon>
          Editar</v-btn
        >
      </v-card-title>
      <v-card-subtitle class="text-uppercase font-weight-regular subtitle-2">
        <v-icon>mdi-map-marker</v-icon>{{ actualUserLocation }}
      </v-card-subtitle>
    </v-card>
    <v-card flat class="d-flex flex-wrap justify-center">
      <garage-card
        v-for="(garage, index) in garagesNearby"
        :key="index"
        :garage="garage"
        class="ma-1"
      ></garage-card>
    </v-card>
    <v-alert
      v-if="garagesNearby.length === 0"
      max-width="600"
      border="top"
      colored-border
      type="info"
      elevation="1"
      class="mx-auto my-5"
    >
      Actualmente no se encuentran aparcamientos disponibles en tu ubicación.
      Por favor, actualiza tu ubicación o realiza una
      <nuxt-link to="/search">búsqueda manual</nuxt-link>.
    </v-alert>
  </div>
</template>

<script>
// import userData from '@/assets/userdata.json'
// import garagesData from '@/assets/garages.json'
import parkingimg from '@/assets/parking.png'
import GarageCard from '@/components/GarageCard'
export default {
  // activar autentificación
  // middleware: 'auth',
  components: {
    GarageCard
  },
  asyncData({ $axios, params }) {
    return Promise.all([
      $axios.get(`${process.env.apiUrl}/users/1`),
      $axios.get(`${process.env.apiUrl}/bookingData`),
      $axios.get(`${process.env.apiUrl}/garages`)
    ]).then(([resUsers, resBooking, resGarages]) => {
      resBooking.data.sort((a, b) => {
        if (a.startDate > b.startDate) return 1
        if (b.startDate > a.startDate) return -1
        return 0
      })
      return {
        userData: resUsers.data,
        bookingData: resBooking.data,
        garagesData: resGarages.data
      }
    })
  },
  data() {
    return {
      parkingimg
      // userData,
      // garagesData
    }
  },
  computed: {
    nextBookingGarage() {
      // userData.bookingData.sort((a, b) => {
      //   if (a.startDate > b.startDate) return 1
      //   if (b.startDate > a.startDate) return -1
      //   return 0
      // })
      return this.bookingData[0]
    },
    garagesNearby() {
      return this.garagesData.filter((el) => {
        return el.location === this.actualUserLocation
      })
    },
    actualUserLocation() {
      return this.userData.actualLocation
    }
  },
  head() {
    return {
      title: ''
    }
  }
}
</script>
