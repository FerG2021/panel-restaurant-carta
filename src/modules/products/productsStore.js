import axios from 'axios';

export default {
	namespaced: true,

	state: {
		products: [],
	},

	mutations: {
		// SET_USER(state, user) {
		// 	state.user = user;
		// 	state.auth = Boolean(user);
		// 	localStorage.setItem('userLS', JSON.stringify(user));
		// 	localStorage.setItem('nameLS', user.name);
		// },

		setProducts(state, products) {
			state.products = products;
		}
	},

	getters: {
		products(state) {
			return state.products;
		},
		// auth(state) {
		// 	return state.auth;
		// }
	},

	actions: {
		async login({ dispatch }, credentials) {
			await axios.get('/sanctum/csrf-cookie');
			await axios.post('/login', credentials);
			return dispatch('getUser');
		},

		async logout({ dispatch }) {
			await axios.post('/logout');
			localStorage.removeItem('userLS');
			localStorage.removeItem('nameLS');
			return dispatch('getUser');
		},

		getUser({ commit }) {
			axios
				.get('/api/user')
				.then((res) => {
					commit('SET_USER', res.data);
				})
				.catch(() => {
					commit('SET_USER', null);
				});
		},
	},
};