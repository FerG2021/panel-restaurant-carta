<template>
	<div>
		<DataTable 
			:value="elements"
			responsiveLayout="scroll"
			:loading="loading"
			:globalFilterFields="['name']"
			v-model:filters="filters"
			filterDisplay="menu"
			headerStyle="text-align: center"
			:scrollHeight="getHeightWindow()"
			class="data-table"
		>
			<template #header>
				<div class="header-container">
					<div class="search-container">
						<span class="p-input-icon-left">
							<i class="pi pi-search" />
							<InputText
								v-model="filters['global'].value"
								:placeholder="$t('productsSection.placeholderSearch')"
							/>
						</span>
					</div>
					<div class="btn-container">
						<Button
							:label="labels.new"
							@click="$emit('add')"
						/>
					</div>
				</div>
			</template>

			<template v-for="column in columns">
				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-if="column.type === 'normal'"
				/>
				
				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-else-if="column.type === 'button'"
				>
					<template #body="slotProps">
						<Button
							v-if="column.variation === 'update'"
							icon="pi pi-pencil"
							class="p-button-rounded p-button-warning mr-2"
							@click="$emit('edit', slotProps.data)"
						/>
						<Button
							v-if="column.variation === 'delete'"
							icon="pi pi-trash"
							class="p-button-rounded p-button-danger"
							@click="deleteRow(slotProps.data)"
						/>
					</template>
				</Column>

				<Column
					:key="column.field"
					:field="column.field"
					:header="column.header"
					v-else-if="column.type === 'image'"
				>
					<template #body="slotProps">
						<Image
							v-if="slotProps.data.imageID != 'null'"
							preview
							:src="slotProps.data.image"
							alt="Image"
							width="40"
							imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px; height: 6vh; width: 6vh"
						/>
						<img
							v-else
							src="../../assets/producto-sin-imagen.png"
							alt="Vue"
							class="without-image-product"
						/>
					</template>
				</Column>
			</template>
		</DataTable>
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';

export default {
	name: 'TableComponent',
	props: {
		elements: {
			type: Array,
			required: true,
		},
		labels: {
			type: Object,
			required: true,
		},
		columns: {
			type: Array,
			required: true,
		},
		loading: {
			type: Boolean,
			required: true,
		}
	},
	data() {
		return {
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
			},
		};
	},
	methods: {
		getHeightWindow() {
			var heightWindow = window.innerHeight - 285;
			return heightWindow + 'px';
		},

		async deleteRow(element) {
			this.$confirm.require({
				header: this.labels.delete.header,
				message: this.labels.delete.message,
				icon: 'pi pi-info-circle',
				acceptClass: 'p-button-danger',
				acceptIcon: 'pi pi-check',
				rejectIcon: 'pi pi-times',
				accept: () => {
					this.$emit('delete', element);
				},
				reject: () => {
					// this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
				},
				onHide: () => {
					// this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.without-image-product {
  height: 6vh;
  width: 6vh;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 3px;
}
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



.header-container {
	display: flex;
	justify-content: space-between;
}

.actions-btns-container {
	border: 1px solid red !important;
}
</style>