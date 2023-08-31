
const { app, BrowserWindow,dialog } = require('electron')




async function start(){


 process.env['server_mode'] = 'prod'


 app.whenReady().then(createWindow)


}





 async function load_vue(win){

 const jiti = require('jiti')(__filename,{cache:'.cache'})

 const vue_app = jiti('./src/server/server_main.ts')

 try{
 await vue_app.appInstance.Instance.start(()=>{

 win.loadURL('http://localhost:5000')

 }
 )

  }catch (e) {

  console.error(e)

  const messageBoxOptions = {
  type: "error",
  title: "Error in Main process",
  message: e.toString()
  };

  dialog.showMessageBoxSync(messageBoxOptions);

  app.exit(1)


 }

 }






 async function createWindow () {
 // Create the browser window.
 const win = new BrowserWindow({
 width: 1400,
 height: 920,
 webPreferences: {
 nodeIntegration: true
 }
 }
 )


  win.on('close',(event)=>{
  const choice = dialog.showMessageBoxSync({
  type: 'question',
  buttons: ['Yes', 'No'],
  title: 'Confirm',
  message: 'Are you sure you want to quit?'
  }
  );

  if (choice === 1) {
  event.preventDefault();
  }

  }
  )


 await load_vue(win)


 }




start()
