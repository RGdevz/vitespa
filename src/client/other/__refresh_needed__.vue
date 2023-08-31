<template>
<div>

 <div style="margin: auto">
<h4>Please Refresh</h4>
 <div class="py-2"></div>
 <Button class="p-button-success p-button-lg" label="refresh" @click="refresh"></Button>

 </div>

</div>
</template>

<script lang="ts">
export default {



methods:{
refresh(){
window.location.reload()
}
},



 name: "__refresh_needed__"
}
</script>

<style scoped>

</style>