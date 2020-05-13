<template>
  <v-card color="brown lighten-5" :width="width">
    <v-img height="200px" :src="garage.imagen"></v-img>
    <v-card-title>{{ garage.address }}</v-card-title>
    <v-card-text class="pa-4">
      <v-rating
        :value="garage.rating"
        color="amber"
        dense
        half-increments
        readonly
        size="16"
        half-icon="mdi-star-half-full"
        class="d-inline"
      ></v-rating>
      <span class="caption mr-2"> ({{ garage.rating }}) </span>
    </v-card-text>
    <v-card-actions>
      <v-btn outlined depressed nuxt :to="`garage/${garage.id}`">Mostrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GarageCard',
  props: {
    garage: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number,
      default: 364
    }
  }
}
</script>
