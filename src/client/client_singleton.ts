import {io, Socket} from 'socket.io-client'
import {ComponentPublicInstance} from "vue";
import EventEmitter from "eventemitter3";
import {Server} from "socket.io";
import {useVue} from "./helpers";
import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {AppRouter} from "../server/trpc";
import superjson from "superjson";



interface emitter_types {

send_pty_data:(data:string)=>void

}


type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;



export class client_singleton {



	// @ts-ignore
	public client : ReturnType<typeof createTRPCProxyClient<AppRouter>>

	public vue:ComponentPublicInstance

	private static _instance: client_singleton;



 private mitter = new EventEmitter()





	public subscribeEmitter<key extends keyof emitter_types>(thekey:key, cb:(...args:Parameters<emitter_types[key]>)=>void){

		this.mitter.on(thekey,cb)

	}


	public unsubscribeEmitter<key extends keyof emitter_types>(thekey:key){

		this.mitter.off(thekey)

	}



	public useEmitter<key extends keyof emitter_types>(thekey:key, ...args:Parameters<emitter_types[key]>){

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
