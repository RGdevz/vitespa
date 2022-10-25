import express, {Express} from 'express'
import fallback from 'express-history-api-fallback'
import * as path from "path";
import * as http from "http";
import {SocketServer} from "./SocketServer";



export class appInstance{



 private static _instance: appInstance;

 private Inited :boolean




  public async init(){

   if (this.Inited) throw new Error('already inited')

   this.Inited = true

   const app = express()


   await this.configure_server(app)



   const server = app.listen(5000)

   server.on('listening',()=>{
   console.log('listening port 5000')
   }
   )



   SocketServer.StartServer(server)

   }








    private async configure_server(app:Express){
    const serverMode = process.env.server_mode as 'dev'|'prod'


    if (serverMode == undefined) throw new Error('no env')


     console.log(`server mode ${serverMode}`)

     if (serverMode == 'dev'){
     const vite = await require('vite').createServer({
     root: path.resolve(''),
     logLevel:'info',
     server: {
     middlewareMode: true,
     watch: {
     usePolling: true,
     interval: 100
     }
     }
     }
     )



     app.use(vite.middlewares)



    } else {


     const root = path.resolve('dist')
     app.use(express.static(root))
     app.use(fallback('index.html', { root }))


    }
    }






 public static get Instance()
 {

 if (!this._instance){
 this._instance = new this()

 }

 return this._instance
 }






}





