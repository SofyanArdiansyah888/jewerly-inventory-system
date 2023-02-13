const { app, BrowserWindow, ipcMain } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");
const remote = require("@electron/remote/main");
require("@electron/remote/main").initialize();



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
    
    checkSocketStatus('192.168.1.192',6002)
    .then((result) => {
      event.sender.send('net-status',result)
    })
    .catch((err) => event.sender.send('net-status',err))
    
    

    client.on('data',(data) => {
      const buf = Buffer.from(data, 'ascii');
      const response = buf.toString('hex', 0, buf.length);
      event.sender.send('net-data',{
        data: splitString(response)
      })
     })
  })

  ipcMain.on('net-close', () => client.end())

  
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
  
    client.on('connect', () => {
      resolve(true);
    });

    client.on('error', () => {
      reject(false);
    });
    try {
      client.connect(port, host);  
    } catch (error) {
      reject(false)
    }
    
    
  });
}
