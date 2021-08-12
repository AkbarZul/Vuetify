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
    <div>
      <v-btn class="mt-5" @click="next">
        go to tester
      </v-btn>
    </div>
    <modal ref="modalName">
      <template v-slot:header>
        <h3>Apakah anda yakin melanjutkan proses verifikasi produk ini?</h3>
      </template>

      <template v-slot:body>
        <h3>
          Keterangan ini diisi dievaluator akan diteruskan ke kasie
        </h3>
      </template>

      <template v-slot:footer>
        <div>
          <v-btn color="orange darken-2" class="ma-2" @click="$refs.modalName.closeModal()">
              batal
          </v-btn>
          <v-btn color="red" class="ma-2" @click="submit">
            next
          </v-btn>
        </div>
      </template>
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

      if (vm.sandiBaru != "" && vm.ulangiSandiBaru != "") {
        return true;
      } else {
        return false;
      }
    },

    changePassword() {
      var vm = this;
      if (vm.validation() == false) {
        // alert("tidak boleh kosong")
        this.$refs.modalName.openModal();
        return;
      }
      console.log("passwordasu", vm.sandiBaru);
      console.log("ulang passsasas", vm.ulangiSandiBaru);
      alert("berhasil submit");
    },
    reset() {
      this.$refs.form.reset();
    },

    next() {
      this.$refs.modalName.openModal();
      // alert("Apakah anda yakin melanjutkan proses verifikasi produk ini?")
      //  this.$router.push({
      //   path: "/tester",
      // });

    },

    submit() {
      const vm = this;

      vm.$router.push({
        path: "/tester",
      });
      vm.$refs.modalName.closeModal();
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
