<template>
  <main class="home-page">
    <el-card>
      <h1>Mesas</h1>

      <div style="display: flex" v-if="loading == true">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div class="grid" style="margin-top: 20px" v-if="loading == false">
        <div
          class="col-3"
          v-for="(mesa, index) in mesas"
          :key="index"
          style="display: flex"
        >
          <!-- {{ mesa }} -->

          <Card
            v-if="mesa.state == 'Habilitada' || mesa.state == 'Libre'"
            style="width: 20em; background: #5cb85c; color: #fff; margin: auto"
          >
            <template #title> {{ mesa.name }} </template>
            <template #subtitle>
              <span style="color: #fff">Pedido por: Fernando</span>
            </template>
            <!-- <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
                sed consequuntur error repudiandae numquam deserunt quisquam
                repellat libero asperiores earum nam nobis, culpa ratione quam
                perferendis esse, cupiditate neque quas!
              </p>
            </template> -->
            <template #footer>
              <Button
                icon="pi pi-eye"
                label="Detalles"
                @click="$refs.modalDetalles.abrir(mesa.id)"
                style="border-bottom: 4px"
                disabled
              />
            </template>
          </Card>

          <Card
            v-if="mesa.state == 'Ocupada'"
            style="width: 20em; background: #d9534f; color: #fff; margin: auto"
          >
            <template #title style="color: #fff"> {{ mesa.name }} </template>
            <template #subtitle>
              <span style="color: #fff">Pedido por: Fernando</span>
            </template>
            <!-- <template #content>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
                sed consequuntur error repudiandae numquam deserunt quisquam
                repellat libero asperiores earum nam nobis, culpa ratione quam
                perferendis esse, cupiditate neque quas!
              </p>
            </template> -->
            <template #footer>
              <Button
                icon="pi pi-eye"
                label="Detalles"
                @click="$refs.modalDetalles.abrir(mesa.id)"
                style="border-bottom: 4px"
              />
            </template>
          </Card>
        </div>
      </div>

      <!-- <div class="grid">
        <div class="col">1</div>
        <div class="col">2</div>
        <div class="col">3</div>
      </div> -->
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
el-card {
  margin: 0px;
  padding: 0px;
}

.botonHome:hover {
  transform: translateY(-2px);
  box-shadow: 0px 2px 5px #0000002a !important;
  cursor: pointer;
  background-color: #cccccc;
}

.iconoTarjeta {
  font-size: 16vh;
  margin-top: 20px;
  color: var(--dark-alt);
}
</style>
