<template>
  <v-card color="brown lighten-5" :width="width">
    <v-img height="200px" :src="garage.imagen"></v-img>
    <v-card-title>{{ garage.address }}</v-card-title>
    <span class="caption mr-2"> ({{ garage.rating }}) </span>
    <v-rating
      :value="garage.rating"
      color="amber"
      dense
      half-increments
      readonly
      size="16"
      half-icon="mdi-star-half-full"
    ></v-rating>
    <v-card-actions>
      <v-btn nuxt :to="`garage/${garage.id}`">Ver</v-btn>
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
