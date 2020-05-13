<template>
  <div>
    <h1>Garage: {{ garage.address }}</h1>
    <v-img :src="garage.imagen" aspect-ratio="2"></v-img>
    <v-list two-line subheader>
      <v-subheader class="title">Datos del aparcamiento</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dirección</v-list-item-title>
          <v-list-item-subtitle>
            {{ garage.address }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dimensiones</v-list-item-title>
          <v-list-item-subtitle>
            Área: {{ garage.area }} m² / Altura máx: {{ garage.height }} m
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Propietario</v-list-item-title>
          <v-list-item-subtitle>
            {{ garage.owner }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import garagesData from '@/assets/garages.json'
export default {
  name: 'Garage',
  data() {
    return {
      garagesData
    }
  },
  computed: {
    garage() {
      return garagesData.filter((el) => {
        return el.id === parseInt(this.$route.params.id)
      })[0]
    }
  }
}
</script>
