<template>

 <div>






  <div class="my-container">




  <div class="py-4"/>


  <div style="padding: 15px; border-radius: 1rem; overflow: hidden; ; background-color: #002b36; " class="shadow-6">
   <div  id="terminal"></div>
  </div>

   <div class="py-4"/>

<!--  <Button @click="toast" class="p-button-rounded ">test</Button>-->

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

import 'xterm/css/xterm.css';
import type {ITerminalAddon, Terminal} from 'xterm'

//@ts-ignore
import { WebglAddon }  from 'xterm-addon-webgl'

export default {

  data(){
  return{
  xterm:null as Terminal,
   addon:null as ITerminalAddon

  }
  },




 unmounted() {
 this.dispose()


 },





 mounted() {


   this.$nextTick(async()=>{

   this.dispose()

   /* await client_singleton.Instance.socket_send('SendMessage',"cool")*/

   await this.create_term()

   }
   )


   },






    methods:{

    dispose(){
    this.addon?.dispose()
    this.addon = null
    this.xterm?.dispose()
    this.xterm = null

   },

   toast(){

   this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
   },




    listen(){

/*
     client_singleton.Instance.mitter.off('shell_session')

     client_singleton.Instance.mitter.on('shell_session',(data:string)=>{
  /!*  console.log(data)*!/

    this.xterm?.write(data)


    }
    )*/

    },





    create_term(){

    return new Promise(async resolve => {

     const load = await import('xterm')



     if (this.xterm) return


     this.xterm = new load.Terminal({

       allowProposedApi:true,

       cursorBlink:true,


       convertEol:true,

       rows:30,
       cols:150,
       fontSize: 20,
       fontFamily: 'Menlo, Monaco, Consolas, monospace',
       theme:{

        background: "#002b36",
        foreground: "#fdf6e3",
        cursor: "#eee8d5",
        selectionBackground: "#ffffff77",
        brightBlack: "#002b36",
        black: "#073642",
        brightGreen: "#586e75",
        brightYellow: "#657b83",
        brightBlue: "#839496",
        brightCyan: "#93a1a1",
        white: "#eee8d5",
        brightWhite: "#fdf6e3"

       }
       }
       )




     const el = document.getElementById('terminal')

      this.xterm.open(el);

      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'false');
      el.setAttribute('autocorrect', 'false');
      el.setAttribute('autocomplete', 'false');
      el.setAttribute('autocapitalize', 'false');


      this.addon = new WebglAddon();
      this.addon.activate(this.xterm)



     this.xterm.onData(async data=>{

   /*  await client_singleton.Instance.socket_send('send_pty', data)*/

      }
      )



     this.xterm.focus()

     this.listen()

     resolve('')

    }
    )


    },



    },



    }
</script>

<style scoped>

</style>