import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			component: () => import('../../components/login/Login.vue'),
		},
		{
			path: '/',
			component: () => import('../../modules/home/Home.vue'),
		},
		// {
		// 	path: '/products',
		// 	component: () => import('../../modules/products/Products.vue'),
		// },
		// {
		// 	path: '/categorias',
		// 	component: () => import('../../views/categories/index.vue'),
		// },
		// {
		// 	path: '/resenias',
		// 	component: () => import('../../views/reviews/index.vue'),
		// },
		{
			path: '/account',
			component: () => import('../../views/miCuenta/index.vue'),
		},
	],
});

export default router;
