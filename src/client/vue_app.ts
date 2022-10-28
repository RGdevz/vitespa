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

import index_page from './pages/index.vue'
import Ripple from 'primevue/ripple';
import {client_singleton} from "./client_singleton";



   export async function init(){


  	const router = createRouter({
	 	history: createWebHistory(),


		 routes: [

				{ path: '/',  component: () => import('./pages/hello.vue') },

			{ path: '/terminal',  component: () => import('./pages/terminal.vue') },
			{ path: '/auth/login',  component: () => import('./pages/login.vue') },


	 	],
  	}
  	)




	const app = createApp(index_page).use(router).use(PrimeVue, {ripple: true}).use(ToastService)



	app.component('Dialog', Dialog);
	app.component('Toast', Toast);
	app.component('Button', Button);
	app.component('InputText', InputText);
	app.component('Card',Card)

	app.directive('ripple', Ripple);


	client_singleton.Instance.vue =	app.mount('#app')





}

