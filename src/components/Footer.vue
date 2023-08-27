<template>
  <div class="container">
    <a href="http://fssolutions.com.ar" target="_blank" :class="screen">
        Desarrollado por FSSolutions
    </a>
  </div>
</template>

<script>
export default {
    props: {
        screen: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped lang="scss">
@import url('../assets/colors.css');

.container {
    text-align: center;
    .login {
        color: var(--backgroun-card);
        text-decoration: none;
    }
    .login:hover {
        color: var(--backgroun-card-hover);
    }
    .main {
        text-align: center;
        color: var(--dark);
        text-decoration: none;
    }
    .main:hover {
        color: var(--dark-alt);
    }
}
</style>