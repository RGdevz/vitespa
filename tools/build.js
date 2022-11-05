
(async()=>{


 const { execSync } = require("child_process");
 const {generate_Routes} = require('./route_generatetor.js')

 const path = require('path')

await generate_Routes()

 execSync(`vite build`, { windowsHide: true, stdio: "inherit", cwd:path.resolve('') });


})()

