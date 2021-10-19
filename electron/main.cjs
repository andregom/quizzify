const { app, dialog, BrowserWindow,  ipcMain } = require('electron');
const { channels } = require('../src/shared/constants');
const childProcess = require('child_process');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

///require('electron-reload')(__dirname);

const p = childProcess.fork(path.join(__dirname, 'NodeBcknd.js'), ['hello'], {
  silent: true,
  detached: true,
  stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  env: {
      ELECTRON_RUN_AS_NODE:1
  }
});

p.send('hello');
p.on('message', (m) => {
	console.log('Got message:', m);
});

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    backgroundColor: '#383838',
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startPoint = {};

  if (isDev) {
    //startPoint.path = "http://localhost:3000";
    options = {
      title: 'Hey, You Are Running In Dev Mode!',
      message: 'The current application is running in Dev Mode',
      detail: 'Happy coding!',
      checkboxLabel: 'Do not show me this again',
      checkboxChecked: true,
    };
    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
      console.log(response);
      console.log(checkboxChecked);
    });
  } /* else {
    startPoint.path = `file://${__dirname}/../index.html`;
  } */

  //load the index.html from a url
  win.loadURL('http://localhost:3000');
  win.webContents.on('did-finish-load', win.show());
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
  });
});