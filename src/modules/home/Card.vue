<template>
    <Card class="card">
        <template #title>
            <h3 class="card-titulo">
                {{ section.titulo }}
            </h3>
        </template>

        <template #content>
            <div class="card-contenedor-icono">
                <span class="material-icons card-icono">
                    {{ section.icono }}
                </span>
            </div>
        </template>
    </Card>
</template>

<script>
export default {
	name: 'HomeCard',
	props: {
		section: {
			type: Object,
			required: true,
		}
	}
};
</script>

<style lang="scss" scoped>
    .card {
        margin: auto;
        width: 90%;
        background-color: var(--dark);
        color: var(--light);
        border-radius: 8px;
        &:hover {
            cursor: pointer;
            background-color: var(--dark-alt);
        }
        .card-titulo {
            text-align: center;
            transition: 0.3s;
        }
        .card-contenedor-icono {
            display: flex;
            .card-icono {
                font-size: 10vh;
                text-align: center;
                margin: auto;
                transition: 0.3s;
            }
        }
    }
</style>