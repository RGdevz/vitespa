<template>

 <div>
 <div class="py-1"/>

 <div class="list-none p-2 m-0" >

  <router-link @click="$emit('link-clicked')" to="/" class="flex align-items-center cursor-pointer p-3 border-round text-700   ">
   <i class="pi pi-home mr-2"></i>
   <span class="font-medium">Dashboard</span>
  </router-link>



  <router-link  @click="$emit('link-clicked')" to="/tests" class="flex align-items-center cursor-pointer p-3 border-round text-700   ">
   <i class=" mr-2"></i>
   <span class="font-medium">Tests</span>
  </router-link>

  <router-link  @click="$emit('link-clicked')" to="/terminal" class="flex align-items-center cursor-pointer p-3 border-round text-700   ">
   <i class=" mr-2"></i>
   <span class="font-medium">Terminal</span>
  </router-link>

 </div>

 </div>

</template>

<script lang="ts">
export default {

 emits:['link-clicked'],

 name: "my_sidebar_content"
}
</script>

<style scoped>

</style>