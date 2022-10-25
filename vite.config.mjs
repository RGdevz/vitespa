
import vue from '@vitejs/plugin-vue'
/*import { viteCommonjs } from '@originjs/vite-plugin-commonjs'*/
export default  {



 plugins: [

  vue(),

  /*  viteCommonjs()*/
 ],
 resolve: { alias: { 'vue': 'vue/dist/vue.esm-bundler.js' }},
 build: {


 /* commonjsOptions: {
   esmExternals: true
  },
*/
  target: 'esnext',

 },



};