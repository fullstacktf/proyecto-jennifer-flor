<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-alert v-if="response === 'success'" dense outlined type="success">
            Se ha actualizado su perfil correctamente.
          </v-alert>
          <v-alert v-if="response === 'error'" dense outlined type="error">
            No se ha podido actualizar su perfil es este momento.
          </v-alert>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="2">
          <v-avatar size="164">
            <v-img
              src="https://pbs.twimg.com/profile_images/1250360843499442176/_SMtQy1V_400x400.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="8">
          <v-card class="d-flex flex-column justify-center">
            <v-card-title class="align-self-center">Mis datos</v-card-title>
            <v-spacer></v-spacer>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                class="d-flex flex-column px-10"
              >
                <v-text-field
                  v-model="info.name"
                  label="Nombre"
                  :placeholder="userMetadata"
                ></v-text-field>
                <v-text-field
                  v-model="info.surname"
                  label="Apellidos"
                  placeholder=""
                ></v-text-field>
                <v-text-field
                  v-model="info.email"
                  label="Correo electrónico"
                  :placeholder="currentUser.email"
                  disabled
                ></v-text-field>
                <v-text-field
                  v-model="info.phone"
                  :rules="phoneRules"
                  label="Móvil"
                ></v-text-field>
                <v-text-field
                  v-model="info.address"
                  label="Dirección"
                ></v-text-field>
                <div class="d-flex justify-space-between">
                  <v-btn color="primary" class="align-self-center" @click="edit"
                    >Editar perfil</v-btn
                  >
                  <v-btn
                    outlined
                    color="accent"
                    class="align-self-end"
                    @click="deleteAccount"
                    >Eliminar mi cuenta</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h2 class="text-center mt-8 mb-6 display-1 font-weight-bold">
            Historial de aparcamientos reservados
          </h2>
        </v-col>
        <v-col>
          <v-card
            color="transparent"
            flat
            class="d-flex flex-wrap justify-center"
          >
            <garage-card
              v-for="(garage, index) in bookingHistory"
              :key="index"
              :garage="garage"
              class="ma-1"
            ></garage-card
          ></v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import garagesData from '../assets/garages.json'
import userData from '../assets/userdata.json'
import GarageCard from '../components/GarageCard.vue'

export default {
  name: 'Perfil',
  middleware: 'auth',
  components: {
    GarageCard
  },
  // Obtiene todos los usuarios.
  asyncData({ $axios }) {
    return $axios.get(`${process.env.apiUrl}/users`).then((response) => {
      return { users: response.data }
    })
  },
  data() {
    return {
      valid: true,
      phoneRules: [
        (v) =>
          /^([9,7,6]{1})+([0-9]{8})$/.test(v) ||
          'Debe introducir un móvil válido.'
      ],
      info: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: ''
      },
      user: '',
      response: null,
      userData,
      garagesData
    }
  },
  computed: {
    ...mapState('modules/auth', ['currentUser', 'userMetadata']),
    bookingHistory() {
      return this.getBookingData(this.userData.bookingHistory)
    }
  },
  methods: {
    ...mapMutations('modules/auth', ['SET_USER_METADATA']),
    async createUser(data) {
      return await this.$axios.post(`${process.env.apiUrl}/users`, data)
    },
    async deleteUser(id) {
      return await this.$axios.delete(`${process.env.apiUrl}/users/${id}`)
    },
    // Obtiene el usuario que ha iniciado sesión.
    getUser() {
      return this.users.filter((user) => {
        return user.email === this.currentUser.email
      })
    },
    // Obtiene el Id del usuario que ha iniciado sesión.
    getUserId() {
      return this.getUser()[0].id
    },
    edit() {
      if (this.$refs.form.validate()) {
        if (this.getUser().length !== 0) {
          // En realidad hay que eliminar el que ya existe.
          this.deleteAccount()
        }
        if (this.$data.info.name === '') {
          this.$data.info.name = this.userMetadata
        }
        this.$data.info.email = this.currentUser.email
        this.createUser(this.$data.info)
          .then(() => (this.response = 'success'))
          .catch(() => {
            this.response = 'error'
          })
      }
    },
    deleteAccount() {
      this.deleteUser(this.getUserId())
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
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
