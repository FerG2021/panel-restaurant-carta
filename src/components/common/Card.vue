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
    props: {
        section: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
    .card {
        margin: auto;
        width: 80%;
        background-color: var(--backgroun-card);
        color: #1e293b;
        border-radius: 4vh;
    }

    .card:hover {
        cursor: pointer;
        background-color: var(--backgroun-card-hover);
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