<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../assets/gorrochef.png" alt="Vue" />
    </div>

    <!-- items del menu -->
    <div class="menu-toggle-wrap">
      <button class="menu-toggle">
        <span class="material-icons" @click="toggleMenu()">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <h3>MENU</h3>
    <div class="menu">
      <div 
        v-for="item in items"
        :key="item"
      >
        <ItemSidebar :item="item" :is_expanded="is_expanded"></ItemSidebar>
      </div>
    </div>

    <div class="flex"></div>

    <!-- Mi cuenta -->
    <div class="menu">
      <ItemSidebar :item="account" :is_expanded="is_expanded"></ItemSidebar>
      <Logout></Logout>
    </div>
  </aside>
</template>

<script setup>
  import { ref } from "vue";

  const is_expanded = ref(false);
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  const toggleMenu = () => {
    is_expanded.value = !is_expanded.value;
  };
</script>

<script>
import ItemSidebar from './common/ItemSidebar.vue';
import Logout from './common/Logout.vue'

export default {
  components: { ItemSidebar, Logout },
  
  data() {
    return {
      items: [
        {
          route: '/',
          icon: 'home',
          name: 'Home',
        },
        {
          route: '/productos',
          icon: 'restaurant',
          name: 'Productos',
        },
        {
          route: '/categorias',
          icon: 'category',
          name: 'Categorías',
        },
        {
          route: '/resenias',
          icon: 'reviews',
          name: 'Reseñas',
        },
      ],

      account: {
        route: '/mi-cuenta',
        icon: 'manage_accounts',
        name: this.$store.state.user.name,
      }
    }
  },

  methods: {
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

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
      height: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
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
