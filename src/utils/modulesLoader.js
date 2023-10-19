import Store from '../managers/store/store';

export default function loadModulesByAccount(store, router, account) {
	const accountsModules = {
		admin: ['Home', 'Products', 'Categories', 'Reviews'],
		empresa: ['Home', 'Products'],
		// Agrega otros tipos de account y los módulos correspondientes aquí
	};

	const processModules = accountsModules[account] || [];

	processModules.forEach(module => {
		console.log('module');
		console.log(module);
		import(`../modules/${module}/${module}Store.js`).then(moduleStore => {
			// Registra el módulo en tu store Vuex
			console.log('moduleStore');
			console.log(moduleStore);
			store.registerModule(`${module}Store`, moduleStore.default);
		});

		// // Agrega las rutas dinámicamente
		// const moduleRoutes = import(`./modules/${module}/routes.js`);
		// if (moduleRoutes) {
		// 	router.addRoutes(moduleRoutes.default);
		// }


		Store.commit('UsersStore/setModules', processModules);

		router.addRoute({
			path: `/${module}`,
			component: () => import(`../modules/${module}/${module}.vue`)
		})
	});
}