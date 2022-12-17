<template>

 <div>





  <div  v-if="$grid.lg">


  <div  style="position: fixed; width: 15vw; background: white; min-height: 100vh; border-right: solid 1px #cbd0dd">

   <my_sidebar_content @link-clicked="show_sidebar = false" />

  </div>


  </div>



  <div v-else>

   <div style="position: fixed; top:10px; left:10px; z-index: 20">
   <Button style="color: black; background: white; border:none" class="p-button-raised" @click="show_sidebar = true" icon="pi pi-bars"  ></Button>
   </div>

   <Sidebar v-model:visible="show_sidebar">

   <my_sidebar_content @link-clicked="show_sidebar = false" />
   </Sidebar>


  </div>




 </div>

</template>


<script lang="ts">
import My_sidebar_content from "./my_sidebar_content.vue";



export default {
 components: {My_sidebar_content},


 methods:{

 },



 data(){
 return{
 show_sidebar:null as boolean
 }
 },

 name: "my_sidebar"
 }


</script>

<style scoped>

</style>