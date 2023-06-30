<template>
  <div v-if="!$store.state.auth">
    <Login />
  </div>
  <div class="app"  v-else>
    <Sidebar />   
    <router-view></router-view>
  </div>

  
</template>

<script>
  import Sidebar from './components/Sidebar.vue'
  import Login from './views/login/index.vue'
  
  export default {
    components:{
      Sidebar,
      Login
    } ,
    data() {
      return {
      }
    },

  }
</script>

<style lang="scss">
  @import url('./assets/colors.css');

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

  }

  body{
    background: var(--light);
  }

  button{
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  .app{
    display: flex;

    main{
      flex: 1 1 0;
      padding: 2rem;

      @media (max-width: 768px){
        padding-left: 6rem;
      }
    }
  }
</style>
