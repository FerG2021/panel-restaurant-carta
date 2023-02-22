import { createStore } from 'vuex'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import { NULL } from 'sass'

// usado para login
axios.defaults.withCredentials = true
// axios.defaults.baseURL = "http://localhost:8000"
export default createStore({
  state: {
    user: null,
    presupuestacionID: null,
    proveedorID: null,
  },

  mutations: {
    SET_USER(state, user) {
      console.log("user");
      console.log(user);
      state.user = user
    }
  },

  actions: {
    async login({ dispatch }, credentials) {
      console.log("credentials");
      // console.log(credentials);

      await axios.get("/sanctum/csrf-cookie");
      console.log("respuesta cookie");
      await axios.post("/login", credentials)
        .then(res => {
          console.log("res");
          console.log(res);

          // commit("SET_USER", res.data)
        })
        // .catch(() => {
        //   console.log("res");
        //   console.log(res);

        //   commit("SET_USER", null)
        // })

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



      return dispatch("getUser");
    },

    getUser({ commit }) {
      console.log("getUser");
      const res = axios.get("/user")
        .then(res => {
          console.log("res");
          console.log(res);

          commit("SET_USER", res.data)
        })
        // .catch(() => {
        //   console.log("res");
        //   console.log(res);

        //   commit("SET_USER", null)
        // })

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


    },
  },

  modules: {

  }
})

