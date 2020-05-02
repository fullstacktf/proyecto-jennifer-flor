<template>
  <v-card color="pink" :width="width">
    <v-img height="200px" :src="garages.imagen"></v-img>
    <v-card-title>{{ garages.address }}</v-card-title>
    <v-rating
      :value="2.5"
      color="amber"
      dense
      half-increments
      readonly
      size="14"
    ></v-rating>
    <v-card-actions>
      <v-btn>Ver</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GarageCard',
  props: {
    address: {
      type: String,
      default: ''
    },
    garages: {
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
