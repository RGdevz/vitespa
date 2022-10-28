import * as os from "os";

import type pty_type from 'node-pty-prebuilt-multiarch'
import {SocketServer} from "./SocketServer";
const pty = require('node-pty-prebuilt-multiarch') as typeof pty_type

const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';


export class NodePty{

	private static _instance: NodePty;


	public static get Instance() {
	return this._instance || (this._instance = new this());
	}



	ptyProcess:pty_type.IPty


	 public run_cmd(cmd:string) {
		this.get_shell().write(cmd/*+'\r'*/)
	 }





  private 	get_shell(): pty_type.IPty{




		if (this.ptyProcess){
		return this.ptyProcess
		}


	 this.ptyProcess = pty.spawn(shell, [], {
		name: 'xterm-color',
		cols: 150,
		rows: 30,
		cwd: process.env.HOME,
		env: process.env
		}
		);



	  this.ptyProcess.onData((data)=>{

	  SocketServer.Instance.io.emit('pty_update',data)
	 /*	console.log(data.replaceAll('\r',''))*/

			}
			)



		this.ptyProcess.onExit(e => {
		console.log('pty exit', e.exitCode)
		this.ptyProcess = undefined
		}
		)




		return this.ptyProcess

	 }




  }