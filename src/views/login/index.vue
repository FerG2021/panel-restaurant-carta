<template>
  <div class="background-login">
    <Toast />

    <div class="contenedor-login">
      <Card class="card-login">
        <template #title>
          <div class="contenedor-img-login">
            <img src="../../assets/gorrochef.png" class="img-login" />
          </div>
          <h1 class="saludo-login">
            RestaurantApp 
          </h1>
        </template>
        <template #content>
          <form
            @submit.prevent="handleSubmit(!v$.$invalid)"
            class="p-fluid mt-30"
          >
            <!-- Email -->
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="email"
                  inputId="integeronly"
                  v-model="v$.email.$model"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                />
                <label
                  for="email"
                  :class="{ 'p-error': v$.email.$invalid && submitted }"
                  >Email<span style="color: red">*</span></label
                >
              </div>
              <small
                v-if="
                  (v$.email.$invalid && submitted) ||
                  v$.email.$pending.$response
                "
                class="p-error"
              >
                {{
                  v$.email.required.$message.replace("Value", "Email")
                }}
              </small
              >
            </div>

            <!-- Password -->
            <div class="field password">
              <div class="p-float-label ">
                <Password
                  id="password"
                  inputId="integeronly"
                  v-model="v$.password.$model"
                  style="width: 100%"
                  :feedback="false"
                  toggleMask
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                />
                <label
                  for="password"
                  :class="{ 'p-error': v$.password.$invalid && submitted }"
                  >Contraseña<span style="color: red">*</span></label
                >
              </div>
              <small
                v-if="
                  (v$.password.$invalid && submitted) ||
                  v$.password.$pending.$response
                "
                class="p-error"
              >
                {{
                  v$.password.required.$message.replace("Value", "Contraseña")
                }}
              </small
              >
            </div>

            <Button
              label="Ingresar"
              type="submit"
              class="mt-2"
              :loading="loadingBtnLogin"
            />
          </form>
        </template>
      </Card>
    </div>
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
      loadingBtnLogin: false,
      submitted: false,
      isFormValid: false,
      // form
      email: "",
      password: "",
    };
  },

  validations() {
    return {
      email: {
        required: helpers.withMessage("El email es requerido", required),
      },
      password: {
        required: helpers.withMessage("La contraseña es requerida", required),
      },      
    };
  },

  methods: {
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
      this.login();
    },

    async login() {
      let existeError = 0;
      this.loadingBtnLogin = true
      await this.axios.get("/sanctum/csrf-cookie");
      await this.axios
        .post("/login", {email: this.email, password: this.password})
        .then((res) => {
          this.$store.dispatch("getUser");
        })
        .catch(function (error) {
          existeError = 1;
          if (error.response) {
            // La respuesta fue hecha y el servidor respondió con un código de estado
            // que esta fuera del rango de 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
            // http.ClientRequest en node.js
            // console.log(error.request);
          } else {
            // Algo paso al preparar la petición que lanzo un Error
            // console.log("Error", error.message);
          }
        });

      this.loadingBtnLogin = false;

      if (existeError == 1) {
        this.$toast.add({
          severity: "error",
          summary: "Ocurrió un error",
          detail: "Mail o contraseña incorrectos",
          life: 3000,
        });
      }

      return this.$router.replace("/");
    },

    resetForm() {
      this.loadingBtnLogin = false;
      this.email = null;
      this.password = null;
      this.submitted = false;
    },
  },
};
</script>

<style type="text/css" scoped>

.background-login {
  height: 100vh;
  background: var(--background-gradient);
  display: flex;
}

.contenedor-login {
  display: flex;
  width: 100%;
}

.card-login {
  margin: auto;
  width: 30vw;
  box-shadow: var(--box-shadow);
}

.contenedor-img-login {
  display: flex;
}

.img-login {
  margin: auto;
  height: 20vh;
}

.saludo-login {
  text-align: center;
  font-size: calc(1em + 1vw);
}

.mt-30 {
  margin-top: 2vh;
}

.password {
  margin-top: 4vh;
}
</style>
