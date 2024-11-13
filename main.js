const { app, BrowserWindow } = require('electron/main');
const path = require('path');

const createWindow = () => {
  // 获取当前页面的 URL
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true, // 启用开发者工具
      contextIsolation: true,    // 关闭上下文隔离
      nodeIntegration: true,     // 启用 Node.js 集成
    }
  });

  win.loadFile('dist/index.html');

  // 打开开发者工具
  win.webContents.openDevTools();

  // 添加 F12 快捷键打开/关闭开发者工具
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' && input.type === 'keyDown') {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools();
      } else {
        win.webContents.openDevTools();
      }
      event.preventDefault();
    }
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
