const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

/** Crea una ventana de la aplicación */
app.on("ready", () => {
  ipcMain.handle('ping', () => 'pong');
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/** Cierra todas las ventanas de la aplicación */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
