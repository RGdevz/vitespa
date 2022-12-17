

(async()=>{


 const jiti = require('jiti')(__filename,{cache:'.cache'})
 await require('./tools/route_generatetor').generate_Routes().catch(x=>console.error(x))
 const vue_app = jiti('./src/server/server_main.ts')

 await vue_app.appInstance.Instance.start()



}
)()

