import Store from '../managers/store/store';

export default function loadModulesByAccount(store, router, account) {
	const accountsModules = {
		// Agrega otros tipos de account y los módulos correspondientes aquí
		admin: [
			{
				name: 'home',
				componentName: 'Home',
			},
			{
				name: 'products',
				componentName: 'Products',
			},
			{
				name: 'categories',
				componentName: 'Categories',
			},
			{
				name: 'reviews',
				componentName: 'Reviews',
			}
			
		],
		empresa: [
			{
				name: 'home',
				componentName: 'Home',
			},
			{
				name: 'products',
				componentName: 'Products',
			}
		]
	};

	const processModules = accountsModules[account] || [];

	processModules.forEach(module => {
		import(`../modules/${module.name}/${module.name}Store.js`).then(moduleStore => {
			store.registerModule(`${module.componentName}Store`, moduleStore.default);
		});

		router.addRoute({
			path: `/${module.name}`,
			component: () => import(`../modules/${module.name}/${module.componentName}.vue`)
		});

		Store.commit('UsersStore/setModules', processModules);
	});
}