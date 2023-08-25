<template>

<layout/>

</template>

<script>
import layout from "./__layout__.vue";
import {client_singleton} from "../client_singleton";
export default {

 mounted() {
 client_singleton.Instance.vue ??= this
 },

 components: {layout}
}
</script>

<style scoped>

</style>
