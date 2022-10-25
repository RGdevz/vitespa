import * as http from "http";

import {Server} from "socket.io";

export class SocketServer{

io:Server

	private static _instance: SocketServer;


 private constructor(http_server: http.Server) {
 this.io = new Server(http_server)
	}




 	private init(){

		this.io.on('connection',(socket)=>{
		socket.on('wow',(callback)=>{
		callback('hi')

		}
		)

		}
		)

	 }



  public static StartServer(http_server: http.Server){

		console.log('init socket server')

		const server = new SocketServer(http_server)
		server.init()
		return server

	 }




	 public static get Instance()
  {

		if (!this._instance){
 	throw new Error('not inited')

		}

		return this._instance
	 }


  }