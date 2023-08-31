
(async()=>{


 const { execSync } = require("child_process");


 const path = require('path')


 execSync(`vite build`, { windowsHide: true, stdio: "inherit", cwd:path.resolve('') });


})()

