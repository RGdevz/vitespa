const path = require('path')
const fs = require('fs/promises')

const { generateRoutes } = require('vue-route-generator')

module.exports.generate_Routes = async function generate_Routes(){

if (process.env.server_mode === 'prod'){
console.log('skipping route generate')
return
}

const code = generateRoutes({
importPrefix:'../src/client/pages/',
pages: path.resolve('src','client','pages') // Vue page component directory
}
)

await fs.writeFile(path.join(__dirname,'generated_routes.ts'),code,{flag:'w+'})

console.log('Routes Generated...')


}