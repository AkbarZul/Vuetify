<template>
  <v-container>
    <h1>
      Tester Validasi Vuetify
    </h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="kode"
        :counter="10"
        :rules="[v => !!v || 'Item is required']"
        type="number"
        label="Kode Pos"
        required
      ></v-text-field>


      <v-btn color="#4CAF50" class="send" @click="validate">
        Validate
      </v-btn>

      <v-btn color="#FF5252" class="mr-4" @click="reset">
        Reset Form
      </v-btn>
    </v-form>
    <modal ref="modalName">
    </modal>
  </v-container>
</template>

<script>
import Modal from "./components/Modal.vue";

export default {
  name: "App",

  components: {
    Modal,
  },

  data: () => ({
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    kode: "",
  }),

  methods: {
    validate() {
      var vm = this;
      if(!this.$refs.form.validate()) {
        this.$refs.modalName.openModal();
        return
      }

      console.log("name", vm.name);
      console.log("email", vm.email);
      console.log("kode", vm.kode);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style>
.send {
  margin-right: 4px;
}
</style>
