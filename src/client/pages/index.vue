<template>

 <div style="text-align:center;">

<h4 class="text-xl" >App</h4>


  <div class="mygrid" >



   <div @click="$router.push('/tests')" class="p-card border-round shadow-3 " style="max-width: 450px;height: 300px; width: 300px;cursor: pointer; display: flex">
    <div style="margin: auto">
    <h4>Card</h4>
    </div>
   </div>

   <button @click="test">test</button>


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


import {client_singleton} from "../client_singleton";

export default {

 methods:{


 async test(){
  try{
  const res = await client_singleton.Instance.client.wtf.query({name:'wow'})
  alert(res)
  }catch (e) {
   alert(e.message)
  }
  }

 },

mounted() {

 /*client_singleton.Instance.ok_toast('hi')*/

}


}


</script>

<style scoped>

</style>
