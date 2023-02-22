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
          <i class="pi pi-stop" style="font-size: 20px" /> Modificar producto
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
          <!-- Nombre -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="nombre"
                inputId="integeronly"
                v-model="v$.nombre.$model"
                style="width: 100%"
                :class="{ 'p-invalid': v$.nombre.$invalid && submitted }"
              />
              <label
                for="nombre"
                :class="{ 'p-error': v$.nombre.$invalid && submitted }"
                >Nombre <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.nombre.$invalid && submitted) ||
                v$.nombre.$pending.$response
              "
              class="p-error"
              >{{
                v$.nombre.required.$message.replace("Value", "Nombre")
              }}</small
            >
          </div>

          <!-- Descripicion -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="descripcion"
                v-model="descripcion"
                toggleMask
                style="width: 100%"
                :class="{ 'p-invalid': v$.descripcion.$invalid && submitted }"
              />
              <label
                for="descripcion"
                :class="{ 'p-error': v$.descripcion.$invalid && submitted }"
                >Descripción <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.descripcion.$invalid && submitted) ||
                v$.descripcion.$pending.$response
              "
              class="p-error"
            >
              {{
                v$.descripcion.required.$message.replace("Value", "Descripcion")
              }}
            </small>
          </div>

          <!-- Precio -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber
                id="precio"
                v-model="v$.precio.$model"
                style="width: 100%"
                mode="currency"
                currency="ARS"
                locale="es-AR"
                :class="{ 'p-invalid': v$.precio.$invalid && submitted }"
              />
              <label
                for="precio"
                :class="{ 'p-error': v$.precio.$invalid && submitted }"
                >Precio <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.precio.$invalid && submitted) ||
                v$.precio.$pending.$response
              "
              class="p-error"
              >{{
                v$.precio.required.$message.replace("Value", "Precio")
              }}</small
            >
          </div>

          <!-- Stock -->
          <div class="field">
              <p for="stock">Disponible</p>
              <InputSwitch id="stock" v-model="stock" />
              <!-- {{ stock }} -->
          </div>

          <!-- Subcategoria -->
          <div class="field">
            <div class="p-float-label">
              <CascadeSelect
                v-model="v$.categoria.$model"
                :options="categoriasAPI"
                optionLabel="name"
                optionGroupLabel="name"
                :optionGroupChildren="['subcategorias']"
                style="minwidth: 14rem"
                :class="{ 'p-invalid': v$.categoria.$invalid && submitted }"
              />
              <label
                for="precio"
                :class="{ 'p-error': v$.categoria.$invalid && submitted }"
                >Categoría <span style="color: red">*</span></label
              >
            </div>
          </div>

          <Button
            label="Guardar"
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
      nombre: "",
      descripcion: "",
      precio: null,
      stock: false,
      imagen: null,
      categoriasAPI: [],
      categoria: null,
    };
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },

      descripcion: {
        required: helpers.withMessage("La descripición es requerida", required),
        // email,
      },

      precio: {
        required: helpers.withMessage("El precio es requerido", required),
        // email,
      },

      categoria: {
        required: helpers.withMessage("La categoria es requerida", required),
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
      this.getCategorias();
      this.getDatos();
    },

    cerrar() {
      this.display = false;
    },

    async getCategorias() {
      await this.axios.get("/api/categoria-listar-todas").then((response) => {
        if (response.data.code == 200) {
          console.log("response.data.data");
          console.log(response.data.data);

          response.data.data.forEach((elemento) => {
            let fila = {
              name: elemento.categoria.name,
              code: elemento.categoria.id,
              subcategorias: elemento.subcategorias,
            };

            this.categoriasAPI.push(fila);
          });

          console.log("this.categoriasAPI");
          console.log(this.categoriasAPI);
        }
      });
    },

    async getDatos() {
      this.loading = true;
      await this.axios.get("/api/producto/" + this.id).then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.nombre = response.data.data.name;
          this.descripcion = response.data.data.description;
          this.precio = response.data.data.price;

          if (response.data.data.stock == true || response.data.data.stock == 1) {
            this.stock = true;
          } else {
            this.stock = false;
          }

          console.log("this.stock")
          console.log(this.stock)


          // console.log("this.categoriasAPI");
          // console.log(this.categoriasAPI);

          this.categoriasAPI.forEach((elemento) => {
            elemento.subcategorias.forEach((ele) => {
              console.log("ele");
              console.log(ele);

              if (ele.id == response.data.data.id_category) {
                this.categoria = ele;
              }
            });
          });

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
      this.loadingBtnGuardar = false;
      this.submitted = false;

      this.nombre = "";
      this.descripcion = "";
      this.precio = null;
      this.stock = false;
      this.imagen = null;
      this.categoriasAPI = [];
      this.categoria = null;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let params = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        idCategoria: this.categoria.id,
        precio: this.precio,
      };

      console.log("this.stock ANTES DE MANDAR")
      console.log(this.stock)


      if(this.stock == true || this.stock == 1){
        params.stock = true
      } else {
        params.stock = false
      }

      // if (this.descripcion != "") {
      //   params.descripcion = this.descripcion;
      // }

      await this.axios
        .put("/api/producto/" + this.id, params)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto modificado con éxito",
              life: 3000,
            });

            this.display = false;
            this.$emit("actualizarTabla");
          } else {
            console.log("response.data.data");
            console.log(response.data.data);

            this.$toast.add({
              severity: "error",
              summary: "Se ha producido un error",
              detail: response.data.data,
              life: 5000,
            });

            // for (const property in response.data.data) {
            //   // console.log(`${property}: ${response.data.data[property]}`);
            //   this.$toast.add({
            //     severity: "error",
            //     summary: "Se ha producido un error",
            //     detail: `${response.data.data[property]}`,
            //     life: 5000,
            //   });
            // }
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
