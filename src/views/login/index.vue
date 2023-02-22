<template>
  <div class="background-login">
    <Toast />

    <Card class="card-login">
      <template #title>
        <h1 style="text-align: center">Panel de gestión</h1>
      </template>
      <template #content>
        <div class="form-content">
          <form
            @submit.prevent="handleSubmit(!v$.$invalid)"
            class="p-fluid"
            style="margin-top: 30px"
          >
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="email"
                  inputId="integeronly"
                  v-model="form.email"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                />
                <label
                  for="dni"
                  :class="{ 'p-error': v$.email.$invalid && submitted }"
                  >Ingresá tu email</label
                >
              </div>
              <small
                v-if="
                  (v$.email.$invalid && submitted) ||
                  v$.email.$pending.$response
                "
                class="p-error"
                >{{ v$.email.required.$message.replace("Value", "DNI") }}</small
              >
            </div>

            <div class="field">
              <div class="p-float-label">
                <Password
                  id="email"
                  v-model="form.password"
                  toggleMask
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                />
                <label
                  for="password"
                  :class="{ 'p-error': v$.password.$invalid && submitted }"
                  >Ingresá tu contraseña</label
                >
              </div>
              <small
                v-if="
                  (v$.password.$invalid && submitted) ||
                  v$.password.$pending.$response
                "
                class="p-error"
                >{{
                  v$.password.required.$message.replace("Value", "DNI")
                }}</small
              >
            </div>
          </form>
        </div>
      </template>

      <template #footer>
        <div class="btn-form">
          <Button
            label="Ingresar"
            type="submit"
            class="mt-2 btn-login"
            @click="login()"
            style="margin: auto; width: 100%"
            :loading="loadingLogin"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";
import { ElMessage, ElMessageBox } from "element-plus";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      user: {},
      ejemplo: null,
      display: false,
      submitted: false,
      isFormValid: false,
      form: {
        email: "",
        password: "",
      },
      emailDirecto: null,
      passwordDirecto: null,
      deshabilitarInputEmail: false,
      deshabilitarInputPassword: false,
      loadingProveedor: false,
      loadingLogin: false,
      loadingBtnIngresar: false,
      rules: {
        email: [
          {
            required: true,
            message: "Por favor ingrese su mail.",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Por favor ingrese su contraseña.",
            trigger: "change",
          },
        ],
      },
    };
  },

  validations() {
    return {
      email: {
        required: helpers.withMessage("El email es requerido", required),
      },
      password: {
        required: helpers.withMessage("La contraseña es requerida", required),
        // email,
      },
      apellido: {
        required: helpers.withMessage("El apellido es requerido", required),
      },
      sexo: {
        required: helpers.withMessage(
          "Seleccione un valor para sexo",
          required
        ),
      },
      edad: {
        required: helpers.withMessage("La edad es requerida", required),
      },
    };
  },

  methods: {
    async login() {
      let existeError = 0;
      if (
        this.form.email == null ||
        this.form.email == "" ||
        this.form.password == null ||
        this.form.password == ""
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Campos incompletos",
          detail: "Se deben completar todos los campos",
          life: 3000,
        });
      } else {
        this.loadingLogin = true;
        console.log("this.form");
        console.log(this.form);
        // this.me()
        let params = {
          mail_usuario: this.form.email,
        };
        await this.axios
          .post("/api/usuario/obtenerDatosMail", params)
          .then((response) => {
            console.log("response");
            console.log(response);
            if (response) {
              // if (response.data.data != undefined) {
              if (response.data != undefined) {
                console.log("response");
                console.log(response);
                // console.log(response.data.data);
                if (response.data.data) {
                  localStorage.setItem("usuarioID", response.data.data.id);
                  localStorage.setItem(
                    "tipoUsuario",
                    response.data.data.tipo_usuario
                  );
                }
              } else {
                console.log("usuario o contraseña incorrecta");
                ElMessage({
                  type: "error",
                  message: "¡Usuario o contraseña incorrecta!",
                });
                this.loadingLogin = false;
              }
            }
          })
          .catch(function (error) {
            if (error.response) {
              // La respuesta fue hecha y el servidor respondió con un código de estado
              // que esta fuera del rango de 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // La petición fue hecha pero no se recibió respuesta
              // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
              // http.ClientRequest en node.js
              console.log(error.request);
            } else {
              // Algo paso al preparar la petición que lanzo un Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });

        // await this.$store.dispatch("login", this.form);

        await this.axios.get("/sanctum/csrf-cookie");
        await this.axios
          .post("/login", this.form)
          .then((res) => {
            this.$store.dispatch("getUser");
          })
          // .catch(() => {
          //   console.log("res");
          //   console.log(res);

          //   commit("SET_USER", null)
          // })

          .catch(function (error) {
            existeError = 1;
            if (error.response) {
              // La respuesta fue hecha y el servidor respondió con un código de estado
              // que esta fuera del rango de 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // La petición fue hecha pero no se recibió respuesta
              // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
              // http.ClientRequest en node.js
              console.log(error.request);
            } else {
              // Algo paso al preparar la petición que lanzo un Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });

        this.loadingLogin = false;

        console.log(existeError);

        if (existeError == 1) {
          this.$toast.add({
            severity: "error",
            summary: "Ocurrió un error",
            detail: "Mail o contraseña incorrectos",
            life: 3000,
          });
        }

        return this.$router.replace("/");
      }
    },

    deshabilitarBtnIngresar() {
      if (
        this.form.email == null ||
        this.form.email == "" ||
        this.form.password == null ||
        this.form.password == ""
      ) {
        return true;
      } else {
        return false;
      }
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
      this.form.email = null;
      this.form.password = null;
      this.submitted = false;
    },
  },
};
</script>

<style scoped>
.background-login {
  /* height: 100vh;
  background-color: var(--dark);
  display: flex;
  align-items: center;
  justify-content: center; */
  /* background: rgb(75, 68, 203);
  background: linear-gradient(
    62deg,
    rgba(75, 68, 203, 1) 0%,
    rgba(34, 34, 223, 1) 29%,
    rgba(0, 212, 255, 1) 100%
  ); */

  height: 100vh;
  background: rgb(98, 215, 222);
  background: linear-gradient(
    48deg,
    rgba(98, 215, 222, 1) 0%,
    rgba(123, 113, 230, 1) 29%,
    rgba(233, 56, 245, 1) 100%
  );
  display: flex;
}

.card-login {
  margin: auto;
  width: 40vw;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.28);
}

.form-content {
  padding: 0px 30px 0px 30px;
}

.btn-form {
  display: flex;
  padding: 0px 30px 0px 30px;
}

.btn-login {
  background: rgb(98, 215, 222);
  background: linear-gradient(
    90deg,
    rgba(98, 215, 222, 1) 0%,
    rgba(123, 113, 230, 1) 29%,
    rgba(233, 56, 245, 1) 100%
  );
  border: none;
  -webkit-transition: background 1s linear;
  transition: background 5s linear;
}

.btn-login:hover {
  background: rgb(98, 215, 222);
  background: linear-gradient(
    270deg,
    rgba(98, 215, 222, 1) 0%,
    rgba(123, 113, 230, 1) 29%,
    rgba(233, 56, 245, 1) 100%
  );
}

.contenedor-login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.material-icons {
  font-size: 18vh;
  color: var(--dark);
}

.card-form {
  height: 100%;
}

.formulario {
  width: 90vh;
  height: 100%;
  text-align: center;
  display: block;
}

.btnEnviar {
  width: 100%;
  text-align: center;
}

.field {
  margin-bottom: 1.5rem;
}

.header {
  margin: 0px !important;
}

.p-dialog {
  border-radius: 30% !important;
}

.loginIcon {
  font-size: 70px;
  border: 6px solid black;
  border-radius: 50%;
  padding: 15px;
  margin-bottom: 10px;
}
</style>
