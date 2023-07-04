<template>
  <main class="about-page">
    <Card>
      <template #header>
        <Title :title="sectionTitle"></Title>
      </template>
      <template #content>
        <div style="margin-top: 10px">
          <DataTable
            :value="categories"
            responsiveLayout="scroll"
            :loading="loading"
            :globalFilterFields="['name']"
            v-model:filters="filters"
            filterDisplay="menu"
            style="text-align: center"
            headerStyle="text-align: center"
          >
            <template #header>
              <div class="display-flex">
                <div class="margin-left">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters['global'].value"
                      placeholder="Escriba para buscar"
                    />
                  </span>
                </div>

                <div class="margin-left-auto">
                  <Button
                    label="Nuevo producto"
                    @click="$refs.modalNuevo.abrir()"
                  />
                </div>
              </div>
            </template>

            <Column field="name" header="Imagen" style="width: 20px">
              <template #body="slotProps">
                <Image
                  v-if="slotProps.data.imageID != 'null'"
                  preview
                  :src="slotProps.data.image"
                  alt="Image"
                  width="40"
                  class="ver-imagen"
                  imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px; height: 6vh; width: 6vh"
                />
              </template>
            </Column>

            <Column field="name" header="Nombre">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.name }}
                </span>
              </template>
            </Column>

            <Column field="categoría" header="Categoría">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.category.name }}
                </span>
              </template>
            </Column>

            <Column field="subcategory" header="Subcategoría">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.subcategory.name }}
                </span>
              </template>
            </Column>

            <Column field="modificar" header="Modificar" style="width: 20px">
              <template #body="slotProps">
                <div class="display-flex">
                  <div class="margin-auto">
                    <Button
                      icon="pi pi-pencil"
                      class="p-button-rounded p-button-warning mr-2"
                      @click="$refs.modalModificar.abrir(slotProps.data.id)"
                      style="margin-right: 5px"
                    />
                  </div>
                </div>
              </template>
            </Column>

            <Column field="eliminar" header="Eliminar" style="width: 20px">
              <template #body="slotProps">
                <div class="display-flex">
                  <div class="margin-auto">
                    <Button
                      icon="pi pi-trash"
                      class="p-button-rounded p-button-danger"
                      @click="eliminar(slotProps)"
                    />
                  </div>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </main>

  <modal-nuevo 
    ref="modalNuevo" 
    @actualizar-tabla="getAll"
  ></modal-nuevo>

  <modal-agregar-subcategoria
    ref="modalAgregarSubcategoria"
    @actualizar-tabla="getAll"
  ></modal-agregar-subcategoria>

  <modal-modificar
    ref="modalModificar"
    @actualizar-tabla="getAll"
  ></modal-modificar>

  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { FilterMatchMode } from "primevue/api";

import ModalNuevo from "./modales/nuevo.vue";
import ModalModificar from "./modales/modificar.vue";
import Title from '../../components/common/Title.vue'

export default {
  components: {
    ModalNuevo,
    ModalModificar,
    Title,
  },

  data() {
    return {
      sectionTitle: 'Productos',
      categories: [],
      loading: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },

  mounted() {
    this.getAll();
  },

  methods: {
    async getAll() {
      this.categories = [];
      this.loading = true;
      await this.axios.get("/api/producto").then((response) => {
        if (response.data.code == 200) {
          this.categories = response.data.data;
        }
      });
      this.loading = false;
    },

    async eliminar(row) {
      this.$confirm.require({
        header: "Confirmación",
        message: "¿Está seguro que desea eliminar el producto?",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
          this.deleteProduct(row);
        },
        reject: () => {
          // this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        },
        onHide: () => {
          // this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
        },
      });
    },

    async deleteProduct(row) {
      await this.axios
        .delete("/api/producto/" + row.data.id)
        .then((response) => {
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto eliminado con éxito",
              life: 3000,
            });
            this.getAll();
          }
        });
    },

    moneda(x) {
      return x.toLocaleString("es-AR");
    },
  },
};
</script>

<style>
.display-flex {
  display: flex;
}

.margin-auto {
  margin: auto;
}

.margin-left-auto {
  margin-left: auto;
}

.product-image {
  width: 70px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  padding: 3px;
}

.headerClass {
  text-align: center !important;
}

.p-column-header-content {
  text-align: center !important;
  align-content: center !important;
  /* border: 1px solid red !important; */
}

.p-column-title {
  /* border: 1px solid green !important; */
  text-align: center !important;
  align-content: center !important;
}
</style>
