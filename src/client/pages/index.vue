<template>

 <div style="display: flex; flex-direction: column; min-height: 100%; min-width: 100%">

  <Toast />

  <div style="cursor: pointer" @click="test">login</div>

  <router-view > </router-view>


 </div>

</template>

<script lang="ts">




import {client_singleton} from "../client_singleton";

export default {

 mounted() {





  },




  methods:{


  test(){



   client_singleton.Instance.get_socket().emit('wow',(msg)=>{
   this.$toast.add({severity:'success', summary: 'Success Message', detail:msg, life: 3000});
   }
   )

  }

  },


  }



</script>

<style scoped>

</style>