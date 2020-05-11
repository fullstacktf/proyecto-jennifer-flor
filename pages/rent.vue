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
              {{ startDate }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1">
              {{ startTime }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase title"
              >Fin</v-list-item-title
            >
            <v-list-item-subtitle class="subtitle-1">
              {{ endDate }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="subtitle-1">
              {{ endTime }}
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
              Calle Test
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Dimensiones</v-list-item-title>
            <v-list-item-subtitle>
              100 m2
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Propietario</v-list-item-title>
            <v-list-item-subtitle>
              Nombre del propietario
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase title"
              >Coste total</v-list-item-title
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ unitPrice }} €/hora
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title> {{ finalPrice }} € </v-list-item-title>
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
export default {
  data() {
    return {
      startDate: 'Sábado 23/05/2020',
      startTime: '16:00',
      endDate: 'Domingo 24/05/2020',
      endTime: '10:00',
      unitPrice: 1.5
    }
  },
  computed: {
    isStarted() {
      return false
    },
    finalPrice() {
      const totalHours = 18
      return this.unitPrice * totalHours
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
