<template>
  <div>
    <h1 v-if="userMetadata !== null" class="mt-4 display-2 text-center">
      ¡Hola {{ userMetadata }}!
    </h1>
    <v-card
      v-if="nextBookingGarage !== false"
      class="my-10 mx-auto"
      max-width="900"
    >
      <v-card-title class="headline font-weight-bold text-uppercase"
        >Sobre tu próxima reserva</v-card-title
      >
      <v-card-subtitle
        >Recuerda hacer Check-In al llegar a tu aparcamiento</v-card-subtitle
      >

      <v-divider></v-divider>

      <v-list class="info-box">
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
        <stripe-checkout
          ref="checkoutRef"
          :pk="publishableKey"
          :items="items"
          :success-url="successUrl"
          :cancel-url="cancelUrl"
        >
          <template slot="checkout-button">
            <v-btn color="success" depressed @click="checkout">Check-In</v-btn>
          </template>
        </stripe-checkout>
      </v-card-actions>
    </v-card>

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

    <h2 class="text-center mt-8 mb-6 display-1 font-weight-bold">
      Aparcamientos cerca de ti
    </h2>

    <v-card color="transparent" flat class="d-flex flex-wrap justify-center">
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
import { mapState } from 'vuex'
import { StripeCheckout } from 'vue-stripe-checkout'
import parkingimg from '@/assets/parking.png'
import GarageCard from '@/components/GarageCard'

export default {
  // activar autentificación
  middleware: 'auth',
  components: {
    GarageCard,
    StripeCheckout
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
      parkingimg,
      // userData,
      // garagesData
      loading: false,
      publishableKey: process.env.stripeKey,
      items: [
        {
          sku: 'sku_HLzLxTThJRkOKU',
          quantity: 1
        }
      ],
      successUrl: 'https://app.garageme.es/success',
      cancelUrl: 'https://app.garageme.es/error'
    }
  },
  computed: {
    ...mapState('modules/auth', ['userMetadata']),
    nextBookingGarage() {
      // userData.bookingData.sort((a, b) => {
      //   if (a.startDate > b.startDate) return 1
      //   if (b.startDate > a.startDate) return -1
      //   return 0
      // })
      const data = this.bookingData.length > 0 ? this.bookingData[0] : false
      return data
    },
    garagesNearby() {
      return this.garagesData.filter((el) => {
        return el.location === this.actualUserLocation
      })
    },
    actualUserLocation() {
      const userLocation =
        this.userData.actualLocation === null
          ? this.userData.location
          : this.userData.actualLocation
      return userLocation
    }
  },
  methods: {
    checkout() {
      this.$refs.checkoutRef.redirectToCheckout()
    }
  },
  head() {
    return {
      title: ''
    }
  }
}
</script>
<style>
.theme--light.v-list.info-box {
  background-color: #f5f5f5;
}
</style>
