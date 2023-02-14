const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");
const remote = require("@electron/remote/main");
require("@electron/remote/main").initialize();


let isOpen = false;
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  remote.enable(win.webContents)
  win.webContents.openDevTools();
  
  ipcMain.on("net-open", (event, data) => {
    
    setTimeout(() => {
      checkSocketStatus('192.168.1.192',6002)
      .then((result) => {
        event.sender.send('net-status',result)
      })
      .catch((err) => {
        event.sender.send('net-status',err);
      })
    },1000)
    
    
    

    client.on('data',(data) => {
      const buf = Buffer.from(data, 'ascii');
      const response = buf.toString('hex', 0, buf.length);
      event.sender.send('net-data',{
        data: splitString(response)
      })
     })
  })

  ipcMain.on('net-close', () => client.destroy())

  
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});


// SOCKET 
const {Socket} = require('net');
const client = new Socket();


function checkSocketStatus(host, port) {
  return new Promise((resolve, reject) => {
  
    client.once('connect', () => {
      isOpen = true;
      resolve(true);
    });

    client.once('error', (err) => {
      isOpen = false;
      reject(false);
    });
    // try {
      if(!isOpen)
      client.connect(port, host);  
    // } catch (error) {
    //   reject(false)
    // }
    
    
  });
}

function splitString(str) {
  let result = [];
  for (let i = 0; i < str.length; i += 36) {
    result.push(str.substring(i, i + 36));
  }
  const distinct = [...new Set(result)]
  return distinct;
}
