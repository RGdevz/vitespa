import {ComponentPublicInstance} from "vue";
import {client_singleton} from "./client_singleton";


export function useVue(cb:(vue:ComponentPublicInstance)=>void){

	const vue = client_singleton.Instance?.['vue']
	if (vue){
	cb(vue)
	}

}
