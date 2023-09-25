<template>
  <div class="container">
    <a href="http://fssolutions.com.ar" target="_blank" :class="screen">
        Desarrollado por FSSolutions
    </a>
  </div>
</template>

<script>
export default {
	name: 'FooterComponent',
	props: {
		screen: {
			type: String,
			required: true,
		}
	}
};
</script>

<style scoped lang="scss">

.container {
    text-align: center;
    .login {
        color: var(--light);
        text-decoration: none;
    }
    .login:hover {
        color: var(--primary-alt);
    }
    .main {
        text-align: center;
        color: var(--dark);
        text-decoration: none;
    }
    .main:hover {
        color: var(--primary-alt);
    }
}
</style>