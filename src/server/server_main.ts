import express, {Express} from 'express'
const fallback = require('connect-history-api-fallback');
import * as path from "path";
import {SocketServer} from "./SocketServer";
import {checkcreds, createjwt, jwtmiddleware} from "./helpers";


import cookieParser from 'cookie-parser'


import * as fs from "fs-extra";


export class appInstance{



 private static _instance: appInstance;









   public async start(on_done?:()=>void){

/*   process.on('unhandledRejection', up => { console.error(up) })*/




   const root = path.resolve('dist')




   const app = express()

   

   const serverMode = process.env.server_mode as 'dev'|'prod'

   if (serverMode == undefined) throw new Error('no env')

   console.log(`server mode ${serverMode}`)

   app.use(cookieParser())
   app.use(express.json())

    app.use((req, res, next) => {

    res.header('cache-control','no-cache')

    next()

    }
    )




    app.post('/auth/login',async (req, res)=>{


    const username = req.body.username
    const password = req.body.password


    const check= checkcreds(username,password)

    if (check){

    const jwt = await createjwt()
    const Cookie_expiry = new Date();
    Cookie_expiry.setDate(Cookie_expiry.getDate()+10e5)
    res.cookie('secret',jwt,{httpOnly: true, path: '/', sameSite: 'strict' , expires:Cookie_expiry })

    return res.send('hi')

    } else {

    return res.status(400).send('bad creds')

    }
    }
    )





    app.get('/auth/check',jwtmiddleware,(req, res) => {
    return res.send('ok')
    }
    )




   if (serverMode == 'dev'){
   const vite = await this.create_vite_middleware()
   app.use(vite)
   } else {



    const check = await fs.pathExists(path.resolve('dist'))

    if (!check) {
     throw new Error('please run build first')

    }
    /*app.use(express.static(root))*/
    app.use(fallback())
    app.use(express.static(root))

   }





   const server = app.listen(5000)

   server.on('listening',()=>{
   console.log(`http://localhost:5000`)

    SocketServer.StartServer(server)

   if (on_done){
   on_done()
   }

   }
   )







   }









    private async create_vite_middleware(){



    const vite = await require('vite').createServer({
    root: path.resolve(''),
    logLevel:'info',
    server: {
    middlewareMode: true,
    watch: {
    usePolling: true,
    interval: 300
    }
    }
    }
    )

    return vite.middlewares

    }









 public static get Instance()
 {
 return this._instance || (this._instance = new this())
 }






}





