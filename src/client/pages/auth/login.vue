<template>

 <div style="text-align: center">


<!--  <h4 >login</h4>-->

  <div style="max-width: 500px; margin: auto;">
  <form class="p-card border-round-2xl shadow-5" style="padding: 50px"  @submit.prevent=login>
  <InputText class="p-inputtext-lg" type="text" name="username" placeholder="username"/>
  <div class="py-1"/>
  <InputText class="p-inputtext-lg" type="text" name="password" placeholder="password"/>

   <div class="py-1"/>

  <Button label="Login" class="p-button-raised p-button-rounded p-button-success p-button-lg" icon="pi pi-check"  type="submit">  </Button>



  </form>

  </div>

 </div>

</template>

<script lang="ts">
import axios, {AxiosError} from "axios";
import {client_singleton} from "../../client_singleton";



export default {

  data(){
  return{

  }
  },


 methods:{


  async login(ev:Event){


  try{

   const form = ev.target as HTMLFormElement;

   //@ts-ignore
  const username =  form.elements.namedItem('username')?.value
   //@ts-ignore
  const password = form.elements.namedItem("password")?.value

  if (!username){
  throw new Error('no username')
  }

  if (!password){
  throw new Error('no password')
  }




  await axios.post(`/auth/login`,{


  username:username,
  password:password

  },
  )

  this.$my_store.login()

  this.$router.push('/')

  }catch (e) {

  const msg = (e as AxiosError).response?.data ?? e.message ?? e.toString()

  client_singleton.Instance.err_toast(msg)

  }


  }

  },



}
</script>

<style scoped>

</style>