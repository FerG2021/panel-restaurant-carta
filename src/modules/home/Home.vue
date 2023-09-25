<template>
    <main>
        <el-card class="main-container">
            <TitleComponent :title="sectionTitle" />

            <div class="container-grid">
                <div
                    class="contenedor-card"
                    v-for="(section, index) in sections"
                    :key="index"
                >
                    <Card 
                        @click="$router.push(section.path)"  
                        :section="section"
                    ></Card>
                </div>
            </div>
        </el-card>
    </main>
</template>

<script>
import Card from './Card.vue';
import TitleComponent from '../../components/common/Title.vue';

export default {
	name: 'HomeComponent',
	components: {
		Card,
		TitleComponent,
	},

	data() {
		return {
			sectionTitle: 'Home',
			sections: [
				{
					titulo: 'Productos',
					icono: 'restaurant',
					path: '/productos',
				},
				{
					titulo: 'Categorías',
					icono: 'category',
					path: '/categorias',
				},
				{
					titulo: 'Reseñas',
					icono: 'reviews',
					path: '/resenias',
				},
				{
					titulo: 'Mi cuenta',
					icono: 'manage_accounts',
					path: '/account',
				},
			],
		};
	},

	methods: {
	},
};
</script>

<style lang="scss" scoped>
.main-container {
	height: 93vh;
	.container-grid {
		display: flex;
		flex-wrap: wrap;
		.contenedor-card {
			padding: 10px 0;
			width: 25%;
		}
	}
}
</style>
