<template>

 <div style="text-align:center;">

<h4 class="text-xl" >App</h4>


  <div class="mygrid" >


   <div @click="$router.push('/terminal')" class="p-card border-round shadow-3 " style="display: flex;max-width: 450px; height: 300px; width: 300px;cursor: pointer">
  <div style="margin: auto">
   <h4>Terminal</h4>
  </div>
   </div>


   <div @click="$router.push('/tests')" class="p-card border-round shadow-3 " style="max-width: 450px;height: 300px; width: 300px;cursor: pointer; display: flex">
    <div style="margin: auto">
    <h4>Card</h4>
    </div>
   </div>


  </div>


 </div>

</template>

<style>

</style>

<style scoped>
.my-container{
 margin-left: 2%;
 margin-right: 2%;

}

</style>

<script lang="ts">


export default {

mounted() {


}


}


</script>

<style scoped>

</style>