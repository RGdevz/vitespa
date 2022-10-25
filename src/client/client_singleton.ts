import {io, Socket} from 'socket.io-client'

export class client_singleton {


	private static _instance: client_singleton;

	private socket :Socket


	public get_socket(){

	if (!this.socket){
	this.socket = io()
	}

	return this.socket

	}




	public static get Instance()
	{

		if (!this._instance){
		this._instance = new this()

		}

		return this._instance
	}


 }