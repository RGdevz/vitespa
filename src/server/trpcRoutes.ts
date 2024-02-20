import {tRPCProcedure} from "./trpc";
import * as z from 'zod'

export class TRPCRoutes{


	public static get_db(t:tRPCProcedure){
	return t.input(z.object({name:z.string()})).query(async(opts)=>{
	return opts.input.name
	}
	)
	}



 }
