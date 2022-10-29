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

import layout from './pages/_layout.vue'
import Ripple from 'primevue/ripple';
import {client_singleton} from "./client_singleton";
import {createPinia} from "pinia";
import axios from "axios";


  declare module '@vue/runtime-core' {
	 interface ComponentCustomProperties {
		$my_store: ReturnType<typeof useMyStore>
	 }
  }





   export async function init(){


				const pinia = createPinia()


	 	const app = createApp(layout).use(pinia)
			const my_store = useMyStore()

		 app.config.globalProperties.$my_store = my_store

	 	try{ await axios.get('/auth/check'); my_store.login() }catch (e) {}


  	const router = createRouter({
	 	history: createWebHistory(),


		 routes: [

			{ path: '/',  component: () => import('./pages/index.vue') },

			{ path: '/terminal',  component: () => import('./pages/terminal.vue') },
			{ path: '/auth/login',  component: () => import('./pages/login.vue') },
				{ path: '/ari',  component: () => import('./pages/ari.vue') },


	 	],
  	}
  	)





		router.beforeEach(async(to, from, next) => {


		if (!my_store.logged_in){

		next(to.path == '/auth/login')
		return

		}

		next(true)

		}

		)





	app.use(router).use(PrimeVue, {ripple: true}).use(ToastService)


	app.component('Dialog', Dialog);
	app.component('Toast', Toast);
	app.component('Button', Button);
	app.component('InputText', InputText);
	app.component('Card',Card)

	app.directive('ripple', Ripple);


	client_singleton.Instance.vue =	app.mount('#app')


		if (!my_store.logged_in){
	 await 	router.push('/auth/login')
		}



}

