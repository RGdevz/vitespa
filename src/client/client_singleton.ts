
import {ComponentPublicInstance} from "vue";
import EventEmitter from "eventemitter3";
import {useVue} from "./helpers";
import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {AppRouter} from "../server/trpc";
import superjson from "superjson";



interface emitterTypes {

send_pty_data:(data:string)=>void

}



export class client_singleton {



	// @ts-ignore
	public client : ReturnType<typeof createTRPCProxyClient<AppRouter>>

	protected vue:ComponentPublicInstance

	private static _instance: client_singleton;



 private mitter = new EventEmitter()





	public subscribeEmitter<key extends keyof emitterTypes>(thekey:key, cb:(...args:Parameters<emitterTypes[key]>)=>void){

		this.mitter.on(thekey,cb)

	}


	public unsubscribeEmitter<key extends keyof emitterTypes>(thekey:key){

		this.mitter.off(thekey)

	}



	public useEmitter<key extends keyof emitterTypes>(thekey:key, ...args:Parameters<emitterTypes[key]>){

		this.mitter.emit(thekey,...args)

	}




	 public ok_toast(msg:string){

		useVue((vue)=>vue.$toast.add({severity:'success', summary: 'Success', detail:msg, life: 3000}))

	 }


		public err_toast(msg:string){
		useVue((vue)=>vue.$toast.add({severity:'error', summary: 'Error', detail:msg, life: 3000}))

		}




  	private initTRPC(){


			this.client =createTRPCProxyClient<AppRouter>({
		transformer: superjson,
		links: [httpBatchLink({url: `${location.protocol + '//' + location.host}/trpc`})]
		}
		)



		return this.client
 	}



	constructor() {
	this.initTRPC()
	}


	public static get Instance()
	{

		if (!this._instance){
		this._instance = new this()

		}

		return this._instance
	}


 }
