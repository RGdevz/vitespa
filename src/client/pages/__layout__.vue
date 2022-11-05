<template>


 <div style="position: relative; overflow: hidden">


  <Toast />

  <div style="display: flex;">
   <div  style="cursor: pointer; margin-left: 25px " @click="$router.push('/')">home</div>
   <router-link style="margin-left: 25px" to="/auth/login">login</router-link>
  </div>

  <div class="py-1"/>



  <router-view style="display: flex; flex-direction: column; min-height: 90vh; width: 100%;" > </router-view>

  <div class="py-2"/>

  <div style="width: 100%;display:flex;color:white;min-height: 10vh;padding: 20px;background: rgb(38,38,38); margin-top: auto; border-top-left-radius: 0.3rem; border-top-right-radius: 0.3rem; text-align: center">
   <div style="margin: auto">
    <div class="p-text-secondary">RGDev</div>
   </div>
  </div>

 </div>

</template>

<script lang="ts">




import {client_singleton} from "../client_singleton";
import axios from "axios";

export default {



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