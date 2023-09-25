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
					<div v-for="field in data.fields" :key="field.name" style="border: 1px solid red; padding: 30px 0px 0px 0px">
						
						<div class="field" v-if="field.type === 'text'">
							<div class="p-float-label">
								<p>
									{{ field.label }} 
									<span v-if="field.required">*</span>
								</p>
								<InputText
									:id="field.name"
									:v-model="field.name"
									@update:modelValue="(value) => handleInputChange(value, field.name)"
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
			type: Object,
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
		},
		handleInputChange(value, moduleName) {
			this.formData[moduleName] = value;
		},
		save() {
			this.errors = this.validateForm();
			this.$emit('formDataUpdate', this.formData);
		},
		validateForm() {
			for (const item of this.data.fields) {
				if (item.required) {
					return !this.formData[item.name] ? `El campo ${item.label} es requerido` : null;
				}
			}

			return null;
		}
	}	
};
</script>

<style>

</style>