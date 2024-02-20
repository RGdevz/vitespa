import express, {Express} from 'express'
const fallback = require('connect-history-api-fallback');
import * as path from "path";

import {checkcreds, createjwt, jwtmiddleware} from "./helpers";


import cookieParser from 'cookie-parser'


import * as fs from "fs-extra";
import {TRPCServer} from "./trpc";


export class appInstance{



 private static _instance: appInstance;









   public async start(){

/*   process.on('unhandledRejection', up => { console.error(up) })*/



   const root = path.resolve('dist')


   const app = express()

    app.use(cookieParser())

   new TRPCServer(app).init()


   const serverMode = process.env.server_mode as 'dev'|'prod'

   if (serverMode == undefined) throw new Error('no env')

   console.log(`server mode ${serverMode}`)


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





    app.get('/auth/check',jwtmiddleware,(req, res) => res.send('ok'))


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





