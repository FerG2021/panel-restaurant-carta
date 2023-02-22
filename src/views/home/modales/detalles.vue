<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '70%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px">
          <i class="pi pi-shopping-bag" /> Detalles del pedido
        </h3>
      </template>

      <div style="display: flex" v-if="datos == null">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div style="margin-top: 5px; width: 100%" v-if="datos != null">
        <h2 style="text-align: center">{{ mesa.name }}</h2>

        <div style="display: flex">
          <div style="margin-left: auto">
            <Button
              icon="pi pi-shopping-bag"
              label="Agregar pedido"
              @click="$refs.modalNuevoPedido.abrir(id)"
              style="border-bottom: 4px"
            />
          </div>
        </div>

        <DataTable
          :value="ordenProductos"
          responsiveLayout="scroll"
          :loading="loading"
          :globalFilterFields="['name']"
          v-model:filters="filters"
          filterDisplay="menu"
          style="text-align: center; margin-top: 20px"
        >
          <Column field="name" header="Nombre">
            <template #body="slotProps">
              <span>
                {{ slotProps.data.productOrder.name }}
              </span>
            </template>
          </Column>

          <Column field="name" header="Detalle">
            <template #body="slotProps">
              <span>
                {{ slotProps.data.productOrder.detail }}
              </span>
            </template>
          </Column>

          <Column field="name" header="Cantidad">
            <template #body="slotProps">
              <span>
                {{ slotProps.data.productOrder.cant }}
              </span>
            </template>
          </Column>

          <Column
            field="name"
            header="Precio"
            bodyStyle="text-align: right"
            headerStyle="text-align: right"
          >
            <template #body="slotProps">
              <span style="text-align: right">
                $ {{ slotProps.data.productDetail.price }}
              </span>
            </template>
          </Column>

          <template #footer>
            <p style="text-align: right">Total: $ {{ orden.price }}</p>
          </template>
        </DataTable>
      </div>

      <template #footer>
        <Button
          label="Guardar"
          type="submit"
          icon="pi pi-check"
          autofocus
          @click="guardar()"
          :loading="loadingBtnGuardar"
        />
      </template>
    </Dialog>
  </div>

  <modal-nuevo-pedido ref="modalNuevoPedido"></modal-nuevo-pedido>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

import ModalNuevoPedido from "./nuevoPedido.vue";

export default {
  setup: () => ({ v$: useVuelidate() }),

  components: {
    ModalNuevoPedido,
  },

  data() {
    return {
      id: null,
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      datos: null,
      orden: null,
      ordenProductos: null,
      mesa: null,
    };
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },
      apellido: {
        required: helpers.withMessage("El apellido es requerido", required),
      },
      email: {
        required: helpers.withMessage(
          "El nombre de usuario es requerido",
          required
        ),
      },
      password: {
        required: helpers.withMessage("La contraseña es requerida", required),
      },
      cpassword: {
        required: helpers.withMessage(
          "Se debe confirmar la contraseña",
          required
        ),
      },
    };
  },

  methods: {
    abrir(id) {
      this.id = id;
      this.submitted = false;
      console.log("abrir");
      this.display = true;
      this.isFormValid = false;
      this.resetForm();
      this.getDatos();
    },

    cerrar() {
      // this.$toast.add({
      //   severity: "error",
      //   summary: "Ventana cerrada con éxito",
      //   detail: "Message Content",
      //   life: 3000,
      // });
      this.display = false;
    },

    handleSubmit(isFormValid) {
      this.isFormValid = isFormValid;

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },

    resetForm() {
      this.datos = null;
      this.orden = null;
      this.ordenProductos = null;
      this.mesa = null;
      this.submitted = false;
    },

    async getDatos() {
      console.log("abrir");
      await this.axios.get("/api/orden/" + this.id).then((response) => {
        if (response.data.code == 200) {
          this.datos = response.data.data;
          this.orden = response.data.data.order;
          this.ordenProductos = response.data.data.orderProducts;
          this.mesa = response.data.data.table;
        }
      });
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      // console.log("this.form");
      // console.log(this.form);
      // this.$emit("update:nuevoEmpleado", this.form);

      let params = {
        nombre: this.form.nombre,
        apellido: this.form.apellido,
        email: this.form.email,
      };

      if (this.form.password != null) {
        params.password = this.form.password;
      }

      if (this.form.cpassword != null) {
        params.cpassword = this.form.cpassword;
      }

      await this.axios
        .put("/api/usuario/actualizar/" + this.id, params)
        .then((response) => {
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Usuario modificado con éxito",
              life: 3000,
            });

            this.display = false;
            this.$emit("actualizar-tabla");
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
