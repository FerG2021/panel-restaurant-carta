<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '35%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px">
          <i class="pi pi-stop" style="font-size: 20px" /> Modificar estado de
          la mesa
        </h3>
      </template>

      <div style="margin-top: 5px; width: 100%">
        <!-- <h5 style="margin: 0px">DNI</h5> -->
        <div style="display: flex" v-if="loading == true">
          <ProgressSpinner
            aria-label="Basic ProgressSpinner"
            style="margin: auto"
          />
        </div>
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid"
          style="margin-top: 30px"
          :loading="loading"
          v-else
        >
          <div class="field">
            <div class="p-float-label">
              <Dropdown
                v-model="v$.estado.$model"
                :options="arrayEstado"
                optionLabel="name"
                optionValue="code"
                placeholder="Select a City"
              />

              <label
                for="estado"
                :class="{ 'p-error': v$.estado.$invalid && submitted }"
                >Estado <span style="color: red">*</span></label
              >
            </div>
          </div>

          <Button
            label="Ingresar"
            type="submit"
            class="mt-2"
            :loading="loadingBtnGuardar"
          />
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      loading: true,
      // form
      id: null,
      estado: null,

      arrayEstado: [
        {
          name: "Habilidata",
          code: "Habilitada",
        },
        {
          name: "Deshabilidata",
          code: "Deshabilitada",
        },
        {
          name: "Libre",
          code: "Libre",
        },
        {
          name: "Ocupada",
          code: "Ocupada",
        },
      ],
    };
  },

  validations() {
    return {
      estado: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },
    };
  },

  methods: {
    abrir(id) {
      this.id = id;
      this.submitted = false;
      this.display = true;
      // this.isFormValid = false;
      this.resetForm();
      this.getDatos();
    },

    cerrar() {
      this.display = false;
    },

    async getDatos() {
      this.loading = true;
      await this.axios.get("/api/mesa/" + this.id).then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.estado = response.data.data.state;

          this.loading = false;
        }
      });
    },

    handleSubmit(isFormValid) {
      console.log("isFormValid");
      console.log(isFormValid);

      this.isFormValid = isFormValid;
      console.log("entro");

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;
      this.guardar();

      // if (!this.showMessage) {
      //   this.resetForm();
      // } else {
      //   this.guardar();
      // }
    },

    resetForm() {
      this.estado = null;
      this.loadingBtnGuardar = false;
      this.submitted = false;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let params = {
        estado: this.estado,
      };

      // if (this.descripcion != "") {
      //   params.descripcion = this.descripcion;
      // }

      await this.axios.put("/api/mesa/" + this.id, params).then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          this.$toast.add({
            severity: "success",
            summary: "Mensaje de confirmación",
            detail: "Estado de la mesa modificada con éxito",
            life: 3000,
          });

          this.display = false;
          this.$emit("actualizarTabla");
        } else {
          console.log("response.data.data");
          console.log(response.data.data);

          for (const property in response.data.data) {
            // console.log(`${property}: ${response.data.data[property]}`);
            this.$toast.add({
              severity: "error",
              summary: "Se ha producido un error",
              detail: `${response.data.data[property]}`,
              life: 5000,
            });
          }
          // this.$toast.add({
          //   severity: "success",
          //   summary: "Se ha producido un error",
          //   detail: response.data.data,
          //   life: 5000,
          // });
        }
      });

      this.loadingBtnGuardar = false;
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

.header {
  margin: 0px !important;
}

.p-dialog {
  border-radius: 30% !important;
}
</style>
