const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
    width: 800,
    height: 600
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

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