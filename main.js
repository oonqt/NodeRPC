const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const logger = require("./utils/logger");
const startupHandler = require("./utils/startupHandler");
const RPCClient = require("./utils/RPCClient");
const { version, homepage, author, license } = require("./package.json");

let mainWindow;

function startApp() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 600,
        // resizable: false,
        maximizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    });

    mainWindow.webContents.on("dom-ready", () => {
        mainWindow.webContents.send("infoData", { version, homepage, author, license })
    });

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.loadFile(path.join("public", "index.html"));
}



app.once("ready", startApp);

app.on("window-all-closed", () => app.quit());