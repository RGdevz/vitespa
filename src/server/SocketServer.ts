import * as http from "http";

import {Server} from "socket.io";
import {NodePty} from "./NodePty";
import {CheckJwtServer} from "./helpers";
import {appInstance} from "./server_main";

const cookie = require("cookie");

export class socket_response {

	the_data: any
	the_error: string


	constructor(data: any, error: string) {

		this.the_data = data
		this.the_error = error
 	}

  }



type default_route_client<T> = (args:T, callback: (timeouterror: Error, socket_response: socket_response) => void) => void
type default_route_server<T> = (args:T, callback: (socket_response: socket_response) => void) => void



 export interface Server_Functions {

	send_pty:default_route_server<string>
		get_calls_history:default_route_server<never>
	pty_update(data:string)

 }





 export interface ServerToClient {
	get_calls_history:default_route_client<never>
 send_pty:default_route_client<string>
	pty_update(data:string)
 }





export class SocketServer{

io:Server<Server_Functions,ServerToClient>

	private static _instance: SocketServer;



 private constructor(http_server: http.Server) {
 this.io = new Server(http_server)
	}




 	  private init(){



	 	this.io.use(async (socket, next) => {



			const cookies = socket.client.request.headers.cookie

			if (!cookies){
			next(new Error("invalid token"));
			return
			}

			const jwt = cookie.parse(cookies)?.secret

			if (!jwt){
			next(new Error("invalid token"));
			return
			}

			try {
			const	check = await CheckJwtServer(jwt)

			if (check) {
			next();
			}

			}catch (e) {

			next(new Error("invalid token"));
			return
			}

			}
		 );





		  this.io.on('connection',(socket)=>{


					socket.on('get_calls_history',(never,call)=>{

						try{

						const list = appInstance.Instance.DataBase.get_call_history()


						call(new socket_response(list,undefined))

						}catch (e){
					console.error(e)
					call(new socket_response(undefined,e.message ?? e.toString()))
					}

					}
					)







		 socket.on('send_pty',(cmd,callback)=>{

			try{

			NodePty.Instance.run_cmd(cmd)

	 	callback(new socket_response('ok',undefined))

			}catch (e) {

			callback(new socket_response(undefined,e.toString()))

			}

			}
			)


		 }
		 )

	  }






  public static StartServer(http_server: http.Server){

		console.log('init socket server')

		this._instance = new SocketServer(http_server)
		this._instance.init()
		return this._instance

	 }







	 public static get Instance()
  {

		if (!this._instance){
 	throw new Error('not inited')

		}

		return this._instance
	 }


  }