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
        :rules="[(v) => !!v || 'Item is required']"
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
    <modal ref="modalName"> </modal>

    <h1 class="form2">
      Input validasi without vuetify
    </h1>

    <div class="height-input">
      <v-label>Kata Sandi Baru</v-label>
      <input
        name="sandi-baru"
        type="password"
        class="custom-input bpom-mb-input"
        v-model="sandiBaru"
      />
      <div v-if="errSandiBaru != null" class="error-message mt-minus-10">
        {{ errSandiBaru }}
      </div>
    </div>

    <div class="height-input">
      <v-label>Ulangi Kata Sandi Baru</v-label>
      <input
        name="ulangi-sandi-baru"
        type="password"
        class="custom-input bpom-mb-input"
        v-model="ulangiSandiBaru"
      />
      <div v-if="errUlangiSandiBaru != null" class="error-message mt-minus-10">
        {{ errUlangiSandiBaru }}
      </div>
    </div>
    <v-btn color="#4544e4" @click="changePassword()" dark class="btn-form">
      Ubah
    </v-btn>
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

    // without vuetify
    sandiBaru: "",
    errSandiBaru: "",
    ulangiSandiBaru: "",
    errUlangiSandiBaru: "",
  }),

  methods: {
    validate() {
      var vm = this;
      if (!this.$refs.form.validate()) {
        this.$refs.modalName.openModal();
        return;
      }

      console.log("name", vm.name);
      console.log("email", vm.email);
      console.log("kode", vm.kode);
    },

    validation() {
      var vm = this;

      if (vm.sandiBaru == "") {
        vm.errSandiBaru = "Kata sandi tidak boleh kosong";
        // this.$refs.modalName.openModal();
      } else {
        vm.errSandiBaru = "";
      }

      if (vm.ulangiSandiBaru == "") {
        vm.errUlangiSandiBaru = "ulangi kata sandi tidak boleh kosong";
        // this.$refs.modalName.openModal();
      } else {
        vm.errUlangiSandiBaru = "";
      }

      if(vm.sandiBaru != "" && vm.ulangiSandiBaru != "") {
        return true
      } else {
        return false
      }
    },

    changePassword() {
      var vm = this;
      if (vm.validation() == false) {
        // alert("tidak boleh kosong")
        this.$refs.modalName.openModal();
        return
      }
        console.log("passwordasu", vm.sandiBaru);
        console.log("ulang passsasas", vm.ulangiSandiBaru);
        alert("berhasil submit")
      
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

.form2 {
  margin-top: 50px;
}
</style>
