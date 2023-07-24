const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
