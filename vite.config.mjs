
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import {join} from 'path'

export default  {



 plugins: [

  vue(),

  Pages({
   dirs: join(__dirname,'src','client','pages'),
   importMode:'async',
   exclude:['error_page.vue'],
   onRoutesGenerated:(routes)=>{

   console.log('routes',routes.length)
  }
  }
  )
  ],


 resolve: { alias: { 'vue': 'vue/dist/vue.esm-bundler.js' }},


  optimizeDeps: {
  exclude: [
 'node-pty-prebuilt-multiarch',
  ],
  },



 build: {


 /* commonjsOptions: {
   esmExternals: true
  },
*/
  target: 'chrome58',

 },



};
