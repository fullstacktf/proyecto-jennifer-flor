<template>
  <div>
    <h1>Tu perfil</h1>
    <v-card class="my-2 py-2 px-4 mx-auto" max-width="400">
      <h3 class="secondary--text">Datos públicos</h3>
      <v-avatar size="164">
        <v-img
          src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
        ></v-img>
      </v-avatar>
      <v-card-title>
        <v-icon small class="mr-1">mdi-account</v-icon>
        {{ userData.name }} {{ userData.lastname }}
      </v-card-title>
      <v-card-subtitle>
        <div>
          <v-icon small class="mr-1">mdi-email</v-icon> {{ userData.email }}
        </div>
        <div>
          <v-icon small class="mr-1">mdi-map-marker</v-icon>
          {{ userData.location }}
        </div>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn depressed color="accent" v-on="on">
              Editar perfil
            </v-btn>
          </template>
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="closeUserDataDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Editar perfil</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items class="pa-2">
                <v-btn dark text outlined @click="saveUserData">
                  <v-icon left>mdi-content-save</v-icon>
                  Guardar
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-form ref="form">
                  <div class="d-flex">
                    <v-text-field
                      v-model="unsaveData.name"
                      class="mx-1"
                      label="Nombre"
                      :placeholder="userData.name"
                      required
                      prepend-icon="mdi-account"
                    ></v-text-field>
                    <v-text-field
                      v-model="unsaveData.lastname"
                      class="mx-1"
                      label="Apellidos"
                      :placeholder="userData.lastname"
                      required
                    ></v-text-field>
                  </div>
                  <v-text-field
                    v-model="unsaveData.email"
                    label="Email"
                    :placeholder="userData.email"
                    required
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="unsaveData.location"
                    label="Localidad"
                    :placeholder="userData.location"
                    required
                    prepend-icon="mdi-map-marker"
                  ></v-text-field>
                  <v-textarea
                    v-model="unsaveData.bio"
                    label="Sobre ti"
                    :placeholder="userData.bio"
                    rows="4"
                    row-height="30"
                    no-resize
                    required
                    prepend-icon="mdi-pencil-outline"
                  ></v-textarea>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
    <!-- <h2 class="d-inline-flex my-4">Actualmente alquilado</h2>
    <v-btn text outlined class="success--text">Modificar Alquiler</v-btn>
    <v-card v-if="userData.booking.length > 0" flat class="d-flex flex-wrap">
      <garage-card
        v-for="(garage, index) in actualRental"
        :key="index"
        :garage="garage"
        class="ma-1"
      ></garage-card
    ></v-card> -->
    <h2 class="text-center mt-8 mb-6 display-1 font-weight-bold">
      Historial de aparcamientos reservados
    </h2>
    <v-card color="transparent" flat class="d-flex flex-wrap justify-center">
      <garage-card
        v-for="(garage, index) in bookingHistory"
        :key="index"
        :garage="garage"
        class="ma-1"
      ></garage-card
    ></v-card>
  </div>
</template>

<script>
import userData from '../assets/userdata.json'
import garagesData from '../assets/garages.json'
import GarageCard from '../components/GarageCard.vue'

export default {
  components: {
    GarageCard
  },
  data() {
    return {
      userData,
      garagesData,
      dialog: false,
      unsaveData: {}
    }
  },
  computed: {
    bookingHistory() {
      return this.getBookingData(this.userData.bookingHistory)
    }
  },
  methods: {
    clearUnsaveUserData() {
      this.unsaveData = {}
    },
    saveUserData() {
      //  UPDATE DATA()
      this.clearUnsaveUserData()
    },
    closeUserDataDialog() {
      this.dialog = false
      this.clearUnsaveUserData()
    },
    getBookingData(type) {
      const garages = {}
      type.forEach((item, index) => {
        garages[index] = garagesData.filter((el) => {
          return el.id === item.garageId
        })[0]
      })
      return garages
    }
  },
  head() {
    return {
      title: 'Perfil'
    }
  }
}
</script>

<style></style>
