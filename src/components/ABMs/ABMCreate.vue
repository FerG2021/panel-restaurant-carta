<template>
	<div>
		<Dialog
			v-model:visible="data.modalVisible"
			icon="pi pi-refresh"
			class="flex justify-content-center dialog"
			:draggable="false"
			style="width: 30vw "
			@hide="handleModalClose()"
		>
			<template #header>
				<TitleModal :header="data.header"></TitleModal>
			</template>

			<div class="form-container">
				<form
					@submit.prevent="handleSubmit(!v$.$invalid)"
					class="p-fluid form"
				>
					<div 
						v-for="field in data.formConfiguration" 
						:key="field.name"
						class="form-item"
					>
						<div class="field" v-if="field.type === 'text'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
									<span 
										v-if="field.required"
										class="required"
									>
										*
									</span>
								</p>
								<InputText
									:id="field.name"
									:v-model="field.defaultValue"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
								/>
							</div>
						</div>

						<div class="field" v-if="field.type === 'price'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
									<span 
										v-if="field.required"
										class="required"
									>
										*
									</span>
								</p>
								<InputText
									:id="field.name"
									:v-model="field.defaultValue"
									:keyfilter="/^\d*$/"
									@update:modelValue="(value) => handleInputChange(value, field.modelName)"
								/>
							</div>
						</div>
					</div>

					<div v-if="errors" class="show-errors">
						{{ errors }}
					</div>

					<Button
						label="Guardar"
						class="mt-2"
						:loading="loadingBtnSave"
						@click="save()"
					/>
				</form>
			</div>
		</Dialog>

		<Toast />
	</div>
</template>

<script>
import TitleModal from '../common/TitleModal.vue';

export default {
	components: { TitleModal },
	props: {
		data: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			formData: {},
			errors: null,
		};
	},
	methods: {
		handleModalClose() {
			this.errors = null;
			this.formData = {};
		},
		handleInputChange(value, moduleName) {
			console.log('value');
			console.log(value);
			this.formData[moduleName] = value;
			this.$emit('formDataUpdate', this.formData);
		},
		save() {
			this.errors = this.validateForm();
			this.$emit('formDataUpdate', this.formData);
		},
		validateForm() {
			for (const item of this.data.formConfiguration) {
				console.log('item');
				console.log(item);
				if (item.required && !this.formData[item.name]) {
					return `El campo ${item.label} es requerido`;
				}
			}

			return null;
		}
	}	
};
</script>

<style lang="scss" scoped>
.form-container {
	.form {
		.form-item {
			padding: 5px 0px 0px 0px;
			.field {
				.p-float-label {
					p {
						.required {
							color: var(--danger);
						}
					}
				}
			}
		}
		.show-errors {
			border: 1px solid red;
			padding: 10px;
			text-align: center;
			background-color: var(--danger);
			color: #fff;
		}
	}
}

</style>