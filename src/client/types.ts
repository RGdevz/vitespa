 export type routeType =  {
		name: string,
		meta?:Record<string, string>
		path: string
		component: ()=>Promise<any>,

	}
