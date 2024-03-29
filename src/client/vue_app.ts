import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import {useMyStore} from './store'
import DataTable from 'primevue/DataTable'
import root from './other/__root__.vue'
import Ripple from 'primevue/ripple';
import {client_singleton} from "./client_singleton";
import VueScreen from 'vue-screen'
import {createPinia} from "pinia";
import Column from "primevue/column";
import Sidebar from 'primevue/sidebar';

// @ts-ignore
import {default as generatedRoutes} from '../../tools/generated_routes'
import {createRoutes} from "./helpers";



  declare module '@vue/runtime-core' {
	 interface ComponentCustomProperties {
		$my_store: ReturnType<typeof useMyStore>
	 }
  }






			async function createVueApp(onCreate:(app:ReturnType<typeof createApp>)=>Promise<void> | void){

				const app = createApp(root)
				await onCreate?.(app)

				client_singleton.Instance['vue'] =	app.mount('#app')

			}






   export async function client_init(){



	  await createVueApp(async app=>{



			const pinia = createPinia()

			app.use(pinia)

			const my_store = useMyStore()

			app.config.globalProperties.$my_store = my_store


		/*	try{
			await axios.get('/auth/check');
			my_store.login()
			}catch (e) {
			console.log('not logged in')
			}*/




			const router = createRouter({
				history: createWebHistory(),
				routes: createRoutes()
			}
			)



			router.beforeEach(async(to, from, next) => {


				/*		if (!my_store.logged_in){
				next(to.path == '/auth/login')
			return
				}*/

				next(true)

			}

			)





	 		app.use(router).use(PrimeVue, {ripple: true}).use(ToastService).use(VueScreen, {
				grid: {
		 	sm: 340,
				md: 768,
				lg: 1024,
				}
		 	}
		 	)


			app.component('DataTable',DataTable)
			app.component('Column',Column)

			app.component('Dialog', Dialog);
			app.component('Toast', Toast);
			app.component('Button', Button);
			app.component('InputText', InputText);
			app.component('Card',Card)
			app.component('Sidebar',Sidebar)
			app.directive('ripple', Ripple);

	 	}
	 	)




		/*if (!my_store.logged_in){
	 await 	router.push('/auth/login')
		}
*/


}

