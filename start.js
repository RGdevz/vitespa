const jiti = require('jiti')(__filename)

const app = jiti('./src/server/server.ts')

app.appInstance.Instance.start()