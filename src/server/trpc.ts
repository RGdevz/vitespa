import {inferAsyncReturnType, initTRPC, TRPCError} from '@trpc/server';
import superjson from "superjson";
import * as trpcExpress from '@trpc/server/adapters/express';
import {Express} from "express";
import {TRPCRoutes} from "./trpcRoutes";

import {createTRPCStoreLimiter} from "@trpc-limiter/memory";
import {CheckJwtServer} from "./helpers";
const requestIp = require('request-ip');




export class TRPCServer{


 private readonly	express:Express
	private readonly createContext = ({req,res}: trpcExpress.CreateExpressContextOptions) => ({req,res});
 private readonly serverTRPCType = undefined as any as ReturnType<ReturnType<typeof initTRPC.context<inferAsyncReturnType<typeof this.createContext>>>['create']>



  public constructor(express:Express) {
  this.express = express
  }





	    private createAdminProcedure(t:typeof this.serverTRPCType){
			  const isAdmin =	t.middleware(async (opts)=>{

					const secret = opts.ctx?.req?.cookies?.['secret']

				try{
				await CheckJwtServer(secret)
				} catch (e) {
			 throw new TRPCError({ code: 'UNAUTHORIZED' });
				}

		 	return 	opts.next()

		 	}
		 	)

		  return  t.procedure.use(isAdmin);
		  }





				  private rateLimiter(root:typeof this.serverTRPCType){
							return  createTRPCStoreLimiter({
						// @ts-ignore
						root,
						fingerprint: (ctx, _input) => requestIp.getClientIp(ctx.req) ?? '127.0.0.1', // return the ip from the request
						windowMs: 30000,
						message: (retryAfter) => `Too many requests, please try again later`,
						max: 5,
						onLimit: (retryAfter, _ctx, fingerprint) => {
				 	console.log('blocked ip', fingerprint)
				  },
				 	}
				 	)
				  }






		private addRoutes(t:typeof this.serverTRPCType){


	 const adminProcedure =	this.createAdminProcedure(t)
		const publicProcedure = t.procedure
		const publicRateLimited = t.procedure.use(this.rateLimiter(t))

	 const router = t.router

		return router({

		wtf: TRPCRoutes.get_db(publicProcedure),


		}
		)
		}






	  private addToExpress(appRouter:any){
			this.express.use('/trpc', trpcExpress.createExpressMiddleware({
			router: appRouter,
			createContext:this.createContext
			}
			)
			)
		 }





  public 	init(){

		const t = initTRPC.context<inferAsyncReturnType<typeof this.createContext>>().create({transformer:superjson});


		const appRouter = this.addRoutes(t as any)

		this.addToExpress(appRouter)


		return appRouter

 	}

  }






export type tRPCProcedure = TRPCServer['serverTRPCType']['procedure']
export type AppRouter = Readonly<ReturnType<TRPCServer['init']>>


