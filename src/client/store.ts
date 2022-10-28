import {defineStore} from "pinia";


 export const useMyStore = defineStore('my_store', {


		state: () => ({
			logged_in :false
	 }

	 ),



	 actions: {
		login() {
 	this.logged_in = true
		},
 	},
  }
  )