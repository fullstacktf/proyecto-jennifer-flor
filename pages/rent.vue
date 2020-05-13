<template>
  <div>
    <v-card v-if="isStarted" flat class="counter mx-auto"
      >TIEMPO QUE QUEDA</v-card
    >
    <v-card max-width="500" outlined class="mx-auto">
      <v-card-title class="text-uppercase headline"
        >Datos de la reserva</v-card-title
      >
      <v-divider></v-divider>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase title"
              >Inicio</v-list-item-title
            >
            <v-list-item-subtitle class="subtitle-1">
              {{ userData.booking.startDate }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1">
              {{ userData.booking.startTime }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase title"
              >Fin</v-list-item-title
            >
            <v-list-item-subtitle class="subtitle-1">
              {{ userData.booking.endDate }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1">
              {{ userData.booking.endTime }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list two-line subheader>
        <v-subheader class="title">Datos del aparcamiento</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Dirección</v-list-item-title>
            <v-list-item-subtitle>
              {{ garageRent.address }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Dimensiones</v-list-item-title>
            <v-list-item-subtitle>
              Área: {{ garageRent.area }} m² / Altura máx:
              {{ garageRent.height }} m
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Propietario</v-list-item-title>
            <v-list-item-subtitle>
              {{ garageRent.owner }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item class="d-flex flex-column flex-md-row">
          <v-list-item-content>
            <v-list-item-title class="text-uppercase title"
              >Coste total</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ garageRent.unitPrice }} €/hora
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ finalPrice }} €
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-btn depressed color="success">Check-in</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed outlined color="error">Anular reserva</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import userData from '@/assets/userdata.json'
import garagesData from '@/assets/garages.json'
export default {
  data() {
    return {
      userData,
      garagesData
    }
  },
  computed: {
    isStarted() {
      return false
    },
    finalPrice() {
      const totalHours = 18
      return this.garageRent.unitPrice * totalHours
    },
    garageRent() {
      const garage = garagesData.filter((el) => {
        return el.id === userData.booking.garageId
      })
      return garage[0]
    }
  },
  head() {
    return {
      title: 'Reservas'
    }
  }
}
</script>

<style></style>
