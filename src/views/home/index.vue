<template>
  <main class="home-page">
    <el-card>
      <h1>Home</h1>

      <div style="display: flex" v-if="loading == true">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div class="grid" v-if="loading == false">
        <div
          class="col-4 contenedor-card"
          v-for="(seccion, index) in secciones"
          :key="index"
        >
          <Card @click="$router.push(seccion.path)" class="card">
            <template #title>
              <h3 class="card-titulo">
                {{ seccion.titulo }}
              </h3>
            </template>

            <template #content>
              <div class="card-contenedor-icono">
                <span class="material-icons card-icono">{{
                  seccion.icono
                }}</span>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </el-card>
  </main>

  <modal-detalles
    ref="modalDetalles"
    @actualizarTabla="obtenerTodos"
  ></modal-detalles>
</template>

<script>
import ModalDetalles from "./modales/detalles.vue";

export default {
  components: {
    ModalDetalles,
  },

  data() {
    return {
      mesas: [],
      secciones: [
        {
          titulo: "Productos",
          icono: "restaurant",
          path: "/productos",
        },
        {
          titulo: "Categorías",
          icono: "category",
          path: "/categorias",
        },
        {
          titulo: "Reseñas",
          icono: "reviews",
          path: "/resenias",
        },
        {
          titulo: "Mi cuenta",
          icono: "manage_accounts",
          path: "/mi-cuenta",
        },
      ],
      loading: true,
    };
  },

  created() {
    this.getDatos();
  },

  methods: {
    async getDatos() {
      this.mesas = [];
      this.loading = true;
      await this.axios.get("/api/mesa").then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.mesas = response.data.data;

          this.loading = false;
        }
      });

      this.loading = false;
    },
  },
};
</script>

<style>
.grid {
  margin-top: 20px;
}

.contenedor-card {
  display: flex;
  /* border: 1px solid red; */
  align-items: center;
}

.card {
  margin: auto;
  width: 80%;
  height: 20vh;
  background-color: #e5e5e5;
  color: #1e293b;
}

.card:hover {
  cursor: pointer;
  background-color: #cccccc;
}

.card:hover .card-titulo {
  font-size: 30px;
}

.card:hover .card-icono {
  font-size: 10.7vh;
}

.card-titulo {
  text-align: center;
  transition: 0.3s;
}

.card-contenedor-icono {
  display: flex;
}

.card-icono {
  font-size: 10vh;
  text-align: center;
  margin: auto;
  transition: 0.3s;
}
</style>
