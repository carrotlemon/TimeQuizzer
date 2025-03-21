const { app, BrowserWindow } = require('electron')

// include the Node.js 'path' module at the top of your file
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 512,
    height: 512,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'), // Securely expose modules
      contextIsolation: true, // Security feature
      enableRemoteModule: false,
      nodeIntegration: false // Keeps the renderer secure
    }
  })

  win.loadFile(path.join(__dirname, '../renderer/index.html'))
  // win.webContents.openDevTools() // FOR DEBUGGING PURPOSES
}

// quit app when all windows closed (Windows, Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// keep app open when all windows closed (Mac)
app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})