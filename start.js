(async()=>{

 const jiti = require('jiti')(__filename)
 await require('./tools/route_generatetor').generate_Routes().catch(x=>console.error(x))
 const app = jiti('./src/server/server_main.ts')

 app.appInstance.Instance.start()


}
)()
