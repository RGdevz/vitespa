import jwt, {JwtPayload} from 'jsonwebtoken'
import {NextFunction, Request, Response} from "express";


const jwtsecret = 'asdv234234^&%&^%&^hjsdfb2%%%'
const mypassword = '123456'
const myuser = 'admin'



export async function sleep(ms:number){
return await new Promise(resolve => setTimeout(()=>resolve(''),ms))
}






   export async function createjwt() : Promise<string>{

	  return  new Promise((resolve, reject) => {

	 	jwt.sign({  }, jwtsecret, {expiresIn : '30d'}, (err,token) => {

			if (err){
				reject(err.message)
				console.log(err)
				return
			}


			resolve(token)


		}
		)

	 }
	 )


  }







  export const CheckJwtServer = async function (jwtwebtoken:string): Promise<JwtPayload>{


	  return new Promise((resolve, reject) => {

		 jwt.verify(jwtwebtoken,jwtsecret,(error,decoded) => {

			if (error){

				reject(error.message)
				return
			}

			resolve(<any>decoded)


		}
		)


	 }
 	)




  }






  export const checkcreds = function (user,pass) : boolean{

	 if (user === myuser){
		if (pass === mypassword){
		return true
		}
		return false
 	}
	 return false

  }












 export  const jwtmiddleware = async function (req: Request, res: Response, next:NextFunction) {


 	const jwt = req.cookies?.secret


	 if (!jwt){


			res.setHeader('content-type', 'text/html');

		return res.status(400).send(`no jwt <br> <a href="/">click to login</a>`)
	 }


	 try{

		await CheckJwtServer(jwt)


		next()

	 }catch (e){
		res.status(400).send(e)
 	}


  }