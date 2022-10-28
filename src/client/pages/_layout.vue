<template>

 <div style="display: flex; flex-direction: column; min-height: 100%; min-width: 100%">


  <Toast />

  <div style="width: 100%; display:flex;">
   <div  style="cursor: pointer; margin-left: 25px " @click="$router.push('/')">home</div>

  <div  style="cursor: pointer; margin-left: 25px" @click="login">login</div>

  </div>

  <router-view > </router-view>


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