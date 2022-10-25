<template>

 <div style="text-align: center">

  <h4>login</h4>

  <form class="p-card border-round-2xl shadow-5" style="max-width: 500px; margin: auto; padding: 50px" @submit.prevent=login>
  <InputText class="p-inputtext-lg" type="text" name="username" placeholder="username"/>
  <div class="py-1"/>
  <InputText class="p-inputtext-lg" type="text" name="password" placeholder="password"/>

   <div class="py-1"/>



  <Button label="Login" class="p-button-raised p-button-rounded p-button-success p-button-lg" icon="pi pi-check"  type="submit">  </Button>



  </form>

 </div>

</template>

<script lang="ts">
import axios from "axios";


export default {

 methods:{

 async login(ev:Event){



   const form = ev.target as HTMLFormElement;

   //@ts-ignore
  const username =  form.elements.namedItem('username')?.value
   //@ts-ignore
  const password = form.elements.namedItem("password")?.value

  if (!username){
   alert('no username')
   return
  }

  if (!password){
  alert('no password')
  return;
  }


  try{

/*  await axios.post(`${base_path()}/auth/login`,{


  username:username,
  password:password

  },
  )*/


   this.$router.push('/')

   }catch (e) {

  alert(e.message ?? e)

  }


  }

  },



}
</script>

<style scoped>

</style>