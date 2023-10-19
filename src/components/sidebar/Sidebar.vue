<template>
	<aside :class="`${is_expanded && 'is-expanded'}`">
		<LogoSidebar/>

		<BtnExpanSidebar @expandSidebar="expandSidebar"/>

		<h3>MENU</h3>
		<div class="menu">
			<div
				v-for="item in items"
				:key="item"
			>
				<ItemSidebar
					v-if="loadedModule(item)" 
					:item="item" 
					:is_expanded="is_expanded"
				></ItemSidebar>
			</div>
		</div>

		<div class="flex"></div>

		<div class="menu">
			<ItemSidebar 
				:item="account" 
				:is_expanded="is_expanded"
			></ItemSidebar>
			<Logout></Logout>
		</div>
  </aside>
</template>

<script>
import ItemSidebar from './ItemSidebar.vue';
import Logout from '../common/Logout.vue';

import { mapGetters } from 'vuex';
import LogoSidebar from './LogoSidebar.vue';
import BtnExpanSidebar from './BtnExpanSidebar.vue';


export default {
	name: 'SideBar',

	components: { ItemSidebar, Logout, LogoSidebar, BtnExpanSidebar },
  
	data() {
		return {
			is_expanded: false,
			items: [
				{
					route: '/',
					icon: 'home',
					name: 'Home',
					id: 'Home',
				},
				{
					route: '/products',
					icon: 'restaurant',
					name: 'Productos',
					id: 'Products',
				},
				{
					route: '/categorias',
					icon: 'category',
					name: 'Categorías',
					id: 'Categories',
				},
				{
					route: '/resenias',
					icon: 'reviews',
					name: 'Reseñas',
					id: 'Reviews',
				},
			],

			account: {
				route: '/account',
				icon: 'manage_accounts',
				name: localStorage.getItem('nameLS')
			}
		};
	},

	computed: {
		...mapGetters('UsersStore', ['user', 'auth', 'modules']),
	},

	methods: {
		expandSidebar(data) {
			this.is_expanded = data;
		},
		loadedModule(item) {
			let modulesName = [];
			for (const module of this.modules) {
				modulesName.push(module.name);
			}
			return modulesName.includes(item.id);
		}
	},
};
</script>

<style lang="scss" scoped>
aside {
	display: flex;
	top: 0;
	flex-direction: column;
	width: calc(2rem + 32px);
	min-height: 100vh;
	overflow: hidden;
	padding: 1rem;
	background-color: var(--dark);
	color: var(--light);
	transition: 0.2s ease-out;
	
	.flex {
		flex: 1 1 0;
	}
	
	h3,
	.button .text {
		opacity: 0;
		transition: 0.3s ease-out;
	}
	
	.menu {
		margin: 0 -1rem;
	}
	
	&.is-expanded {
		width: var(--sidebar-width);
		.menu-toggle-wrap {
			top: -3rem;
			.menu-toggle {
			transform: rotate(-180deg);
			}
		}
		h3,
			.button .text {
				opacity: 1;
		}
		h3 {
			color: var(--grey);
			font-size: 0.875rem;
			margin-bottom: 0.5rem;
			text-transform: uppercase;
		}
		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}
	}

	@media (max-width: 768px) {
		position: fixed;
		z-index: 99;
	}

	.logout {
		cursor: pointer;
	}
}
</style>
