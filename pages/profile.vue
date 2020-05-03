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
                      :placeholder="userJson.name"
                      required
                      prepend-icon="mdi-account"
                    ></v-text-field>
                    <v-text-field
                      v-model="unsaveData.lastname"
                      class="mx-1"
                      label="Apellidos"
                      :placeholder="userJson.lastname"
                      required
                    ></v-text-field>
                  </div>
                  <v-text-field
                    v-model="unsaveData.email"
                    label="Email"
                    :placeholder="userJson.email"
                    required
                    prepend-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    v-model="unsaveData.location"
                    label="Localidad"
                    :placeholder="userJson.location"
                    required
                    prepend-icon="mdi-map-marker"
                  ></v-text-field>
                  <v-textarea
                    v-model="unsaveData.bio"
                    label="Sobre ti"
                    :placeholder="userJson.bio"
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
    <h2 class="d-inline-flex my-4">Actualmente alquilado</h2>
    <v-btn text outlined class="success--text">Modificar Alquiler</v-btn>
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
      garagesJson,
      dialog: false,
      unsaveData: {}
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
    clearUnsaveUserData() {
      this.unsaveData = {}
    },
    saveUserData() {
      console.log(this.unsaveData)
      this.clearUnsaveUserData()
    },
    closeUserDataDialog() {
      this.dialog = false
      this.clearUnsaveUserData()
    },
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
