<template>


 <div style="position: relative; overflow: hidden">


  <Toast />


 <my_sidebar/>


<!--  <div style="display: flex;">
   <div  style="cursor: pointer; margin-left: 25px " @click="$router.push('/')">home</div>
   <router-link style="margin-left: 25px" to="/auth/login">login</router-link>
  </div>-->

<!--  <div class="py-1"/>-->



  <div style=" min-height: 90vh;" :style="$grid.lg ? 'margin-left: 15vw' : ''" >
  <router-view style="display: flex; flex-direction: column; min-height: 90vh; padding-bottom: 20px" > </router-view>
  </div>





   <div style="width: 100%;display:flex;color:white;min-height: 10vh;background: rgb(38,38,38); margin-top: auto; border-top-left-radius: 0.3rem; border-top-right-radius: 0.3rem; text-align: center">
   <div style="margin: auto">
   <div class="p-text-secondary">RGDev</div>
   </div>
   </div>



 </div>

</template>

<script lang="ts">




import {client_singleton} from "../client_singleton";
import axios from "axios";
import My_sidebar from "../components/my_sidebar.vue";

export default {
 components: {My_sidebar},

 mounted() {



  },




  methods:{





   login(){


  client_singleton.Instance.vue.$router.push('/auth/login')


  }

  },


  }



</script>

<style scoped>

</style>