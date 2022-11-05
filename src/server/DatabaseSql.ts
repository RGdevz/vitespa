import Database from 'better-sqlite3';
import * as fs from 'fs/promises'
import path from "path";


export type call_history = {id:number,caller_number:string,destination:string,duration_seconds:number}

export class DatabaseSql{

	db:Database.Database

	 async init(){
		this.db = new Database('database.db');

		const scheme = await fs.readFile(path.resolve('sql_scheme.txt'),{encoding:'utf8'})


		this.db.exec(scheme)

		return this
	}





	public get_call_history():Array<call_history>{

	const data = this.db.prepare('select * from calls_history').all()

	return data
	}




	public add_to_call_history(caller_number:string,dest:string,duration:number){

 this.db.prepare(`INSERT INTO calls_history (duration_seconds,destination, caller_number) VALUES ( ? ,?, ?);`).run([duration,dest,caller_number])



	}


 }