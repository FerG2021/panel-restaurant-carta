<template>
    <h1 style="margin-top: 20px; margin-left: 20px">{{ title }}</h1>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        }
    }
}
</script>

<style>

</style>