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
            RestaurantApp <br />
            Panel de gestión
          </h1>
        </template>
        <template #content>
          <div class="form-content">
            <form
              @submit.prevent="handleSubmit(!v$.$invalid)"
              class="p-fluid"
              style="margin-top: 30px"
            >
              <div class="field" style="margin-bottom: 3vh">
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
                  >{{
                    v$.email.required.$message.replace("Value", "DNI")
                  }}</small
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
                    @keyup.enter="login()"
                    :feedback="false"
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
  height: 100vh;
  background: rgb(30, 41, 59);
  background: linear-gradient(
    22deg,
    rgba(30, 41, 59, 1) 0%,
    rgba(56, 76, 110, 1) 54%
  );
  display: flex;
}

.contenedor-login {
  display: flex;
  /* border: 1px solid red; */
  width: 100%;
}

.card-login {
  margin: auto;
  width: 40vw;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.28);
  height: 70vh;
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

.form-content {
  padding: 0px 2vw 0px 2vw;
}

.btn-form {
  display: flex;
  padding: 0px 2vw 0px 2vw;
}

.btn-login {
  background: rgb(30, 41, 59);
  background: linear-gradient(
    22deg,
    rgba(30, 41, 59, 1) 0%,
    rgba(56, 76, 110, 1) 54%
  );
  border: none;
  -webkit-transition: background 1s linear;
  transition: background 5s linear;
}

.btn-login:hover {
  background: rgb(52, 62, 78);
  background: linear-gradient(
    22deg,
    rgba(52, 62, 78, 1) 0%,
    rgba(75, 93, 124, 1) 54%
  );
}
</style>
