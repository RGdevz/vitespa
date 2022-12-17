import {io, Socket} from 'socket.io-client'
import {ComponentPublicInstance} from "vue";
import EventEmitter from "eventemitter3";
import {Server} from "socket.io";
import {Server_Functions, ServerToClient} from "../server/SocketServer";


interface emitter_types {

send_pty_data:(data:string)=>void

}


type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;



export class client_singleton {


	private static _instance: client_singleton;

	private socket :Socket<Server_Functions,ServerToClient>

 private mitter = new EventEmitter()

	public vue: ComponentPublicInstance


	public subscribeEmitter<key extends keyof emitter_types>(thekey:key, cb:(any)=>void){

	this.mitter.on(thekey,cb)

	}


	public unsubscribeEmitter<key extends keyof emitter_types>(thekey:key){

	this.mitter.off(thekey)

	}



	public useEmitter<key extends keyof emitter_types>(thekey:key, ...args){

	this.mitter.emit(thekey,...args)

	}




	 public ok_toast(msg:string){
		this.vue.$toast.add({severity:'success', summary: 'Success', detail:msg, life: 3000});
	 }


		public err_toast(msg:string){
	 this.vue.$toast.add({severity:'error', summary: 'Error', detail:msg, life: 3000});
		}




 	private  send_error(error:string, reject:any){


		if (typeof error != 'string'){
	 error = JSON.stringify(error)
		}

		reject(error)
 	}







  public	send_request<name extends keyof ServerToClient>(route:name, args:FirstArgument<ServerToClient[name]> = Object()) :Promise<unknown> {



	  	return  new Promise((resolve, reject) => {

		 	if (!this.get_socket()?.active){
				reject('socket error')
				return
		 	}



			this.get_socket().timeout(10000).emit(route,args,(timeouterr,data)=>{



				if (timeouterr){
		 	this.send_error(timeouterr.message,reject)
				return
				}


				if (!data){
				this.send_error('no data returned',reject)
		 	return;
				}

				if (data.the_error){

			 this.send_error(data.the_error,reject)
				return

				}


				resolve(data.the_data)

			}
			)

		 }
	 	)


	  }







	private get_socket():Socket{

	if (this.socket) return this.socket


	this.socket = io()

	this.socket.on('pty_update',(data)=>{

	this.useEmitter('send_pty_data',data)

		}
		)



		this.socket.on('connect_error',(e)=>{


		this.err_toast(e.message)
		console.error('cant connect to socket',e)

		}
		)



	return this.socket

	}







  public 	disconnect(){

 		setTimeout(()=>{
			
			try {
			this.socket?.disconnect()
			}catch (e) {
				
			}
				this.socket = null
				
		 },100)

	  }







	  private socket_stuffs(){

		 window.addEventListener("beforeunload", (e) => {
	 	this.disconnect()
		 }
		 );


	 	const ismobile = matchMedia('(hover: none)').matches;

	 	if (ismobile){
		 document.addEventListener('visibilitychange', (ev) => {

			if (document.visibilityState === 'visible'){
	 	this.get_socket()
			} else {
		 this.disconnect()
		 }

			}
			);
		 }
	  }







	public static get Instance()
	{

		if (!this._instance){
		this._instance = new this()
		this._instance.socket_stuffs()

		}

		return this._instance
	}


 }