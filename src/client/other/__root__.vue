<template>

 <router-view/>

</template>

<script>
import layout from "../layouts/main.vue";
import {client_singleton} from "../client_singleton";
export default {

 created() {
 client_singleton.Instance.vue ??= this
 },

 components: {layout}
}
</script>

<style scoped>

</style>
