<template>
	<main class="about-page">
		<Card class="card">
			<template #header>
				<TitleComponent :title="sectionTitle" />
			</template>

			<template #content>
				{{ formData }}
				<TableComponent 
					:elements="dataTableData"
					:columns="tableColumns"
					:labels="labels"
					:loading="loading"
					@add='add'
					@edit='edit'
					@delete='deleteProduct'
				/>
			</template>
		</Card>
	</main>

	<!-- <new 
		ref="newModal" 
		@actualizar-tabla="getAll"
	></new> -->

	<!-- <ABMCreate 
		ref="newModal" 
		@actualizar-tabla="getAll"
	/> -->

	<ABMCreate 
		:data="create" 
		@formDataUpdate='formDataUpdate'
	/>

	<update
		ref="updateModal"
		@actualizar-tabla="getAll"
	></update>

	<ConfirmDialog></ConfirmDialog>
</template>

<script>
import { mapGetters } from 'vuex';

// import New from './modales/NewProduct.vue';
import Update from './modales/UpdateProduct.vue';
import TitleComponent from '../../components/common/Title.vue';
import TableComponent from '../../components/datatable/Table.vue';

import { getProducts } from '../../managers/api/api';
import ABMCreate from '../../components/ABMs/ABMCreate.vue';


export default {
	name: 'ProductsComponent',
	components: {
		// New,
		Update,
		TitleComponent,
		TableComponent,
		ABMCreate,
	},

	data() {
		return {
			sectionTitle: this.$t('products'),
			formData: {},
			products: [],
			categories: [],
			loading: true,
			labels: {
				new: 'Nuevo producto',
				delete: {
					header: 'Confirmación',
					message: '¿Está seguro que desea eliminar el producto?'
				}
			},
			tableColumns: [
				{ 
					field: 'image', 
					header: 'Imagen', 
					type: 'image', 
					variation: '' 
				},
				{ 
					field: 'name', 
					header: 'Name', 
					type: 'normal', 
					variation: '' 
				},
				{ 
					field: 'category', 
					header: 'Categoría', 
					type: 'normal', 
					variation: '' 
				},
				{ 
					field: 'subcategory', 
					header: 'Subcategoría', 
					type: 'normal', 
					variation: '' 
				},
				{ 
					field: 'price', 
					header: 'Precio', 
					type: 'normal', 
					variation: '' 
				},
				{ 
					field: 'name', 
					header: 'Editar', 
					type: 'button', 
					variation: 'update' 
				},
				{ 
					field: 'name', 
					header: 'Eliminar', 
					type: 'button', 
					variation: 'delete' 
				},
			],
			create: {
				modalVisible: false,
				header: {
					class: 'material-icons',
					icon: 'restaurant',
					headerName: 'Nuevo producto',
				},
				formConfiguration: [
					{
						modelName: 'name',
						label: 'Nombre',
						type: 'text', 
						required: true,
						defaultValue: null,
					},
					{
						modelName: 'description',
						label: 'Descripción',
						type: 'text', 
						required: true,
						defaultValue: null,
					},
					{
						modelName: 'price',
						label: 'Precio',
						type: 'price', 
						required: true,
						defaultValue: null,
					},
					{
						modelName: 'stock',
						label: 'Disponible',
						type: 'switch', 
						values: ['Si', 'No'],
						required: true,
						defaultValue: null,
					},
					// {
					// 	name: 'category',
					// 	label: 'Categoría',
					// 	type: 'cascadeSelect', 
					// 	required: true,
					// 	options: this.categories,
					// 	optionLabel: 'name',
					// 	optionGroupLabel: 'name',
					// 	optionGroupChildren: 'subcategorias'
					// },
				]
			}
		};
	},

	computed: {
		...mapGetters('ProductsStore', ['products']),
		dataTableData() {
			let data = [];
			for (const item of this.products) {
				let row = {
					id: item.id,
					name: item.name,
					price: item.price,
					image: item.image,
					imageID: item.imageID,
					category: item.category.name,
					subcategory: item.subcategory.name,
					subcategoryID: item.id_subcategory,
				};
				data.push(row);
			}
			return data;
		}
	},

	methods: {
		async getAll() {
			// this.products = [];
			// this.loading = true;
			// await this.axios.get('/api/producto').then((response) => {
			// 	if (response.data.code == 200) {
			// 		this.products = response.data.data;
			// 	}
			// });
			// this.loading = false;

			this.loading = true;
			getProducts()
				.then((response) => {
					this.products = response.data.data;
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		async deleteProduct(element) {
			await this.axios
				.delete('/api/producto/' + element.id)
				.then((response) => {
					if (response.data.code == 200) {
						this.$toast.add({
							severity: 'success',
							summary: this.$t('productsSection.headerDeleteConfirmation'),
							detail: this.$t('productsSection.deleteConfirmation'),
							life: 3000,
						});
						this.getAll();
					}
				});
		},

		add() {
			// this.$refs.newModal.abrir();
			this.create.modalVisible = true;
		},

		edit(data) {
			this.$refs.updateModal.abrir(data.id);
		},

		formDataUpdate(value) {
			console.log('value');
			console.log(value);

			this.formData = value;
		}
	},

	created() {
		this.getAll();
	},
};
</script>

<style scoped lang="scss">
.about-page {
  .card {
    height: 100%;
    .data-table-container {
      margin-top: 10px;
      .data-table {
        text-align: center;
        .display-flex {
          display: flex;
        }
        .margin-left-auto {
          margin-left: auto;
        }
        .column {
          width: 20px;
        }
      }
    }
  }
}

.margin-auto {
  margin: auto;
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

.without-image-product {
  height: 6vh;
  width: 6vh;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 3px;
}
</style>
