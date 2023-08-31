import type {ComponentPublicInstance} from "vue";
import {client_singleton} from "./client_singleton";
import error_page from "./other/__refresh_needed__.vue";
import page_404 from "./other/__404__.vue";

import main_layout from "./layouts/main.vue";
import main2_layout from "./layouts/main2.vue";
//@ts-ignore
import routes from "~pages";



export function useVue(cb:(vue:ComponentPublicInstance)=>void){

	const vue = client_singleton.Instance?.['vue']
	if (vue){
	cb(vue)
	}

 }



  	export  function createRoutes(){

	  const allLayout = {
			main:main_layout,
			main2:main2_layout
	 	}


	 	const final_routes =	routes.map( (x)=>{



			const new_comp = {
			...x,
			path:'',
			component: ()=> x.component().catch((e)=>{
			console.log(e)
			return error_page
	 	}
	 	)
			}



			return{
			path: x.path,
			meta: x.meta,
			component:x.meta?.layout ? allLayout[x.meta.layout] || allLayout.main : allLayout.main,
			children:[new_comp]
			}
	 	}

	 	)


		//@ts-ignore
		final_routes.push({ path: '/:pathMatch(.*)*', name: 'NotFound', component: page_404 })
		return final_routes
	}
