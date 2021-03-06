const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("path");
const Logger = require("./utils/logger");
const startupHandler = require("./utils/startupHandler");
const JsonDB = require("./utils/JsonDB");
const RPCClient = require("./utils/RPCClient");
const { version, homepage, author, license } = require("./package.json");

const db = new JsonDB(path.join(app.getPath("userData"), "config.json"));
const startup = new startupHandler(app);
const logger = new Logger((process.defaultApp ? "console" : "file"), app.getPath("userData"));

let mainWindow;
let rpc;

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

    // mainWindow.setMenu(null);

    mainWindow.webContents.on("dom-ready", () => {
        mainWindow.webContents.send("data:info", { version, homepage, author, license });

        let data = db.data
        data.runAtStartup = startup.isEnabled;

        mainWindow.webContents.send("data:settings", data );
    });

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.loadFile(path.join("public", "index.html"));
}

ipcMain.on("settings:app", ({}, data) => {
    if(data.runAtStartup) {
        startup.enable();
    } else {
        startup.disable();
    }

    delete data.runAtStartup;

    db.save(data);
    dialog.showMessageBox(mainWindow, { type: "info", detail: "Saved Settings" });
});

ipcMain.on("settings:appearance", ({}, data) => {
    db.save(data);

    dialog.showMessageBox(mainWindow, { type: "info", detail: "Saved Settings" });
});

ipcMain.on("settings:clear", () => {
    db.delete();

    dialog.showMessageBox(mainWindow, { type: "info", detail: "Wiped Settings" });
});

ipcMain.on("settings:clear", () => {
   shell.openItem(logger.logPath);
});

app.once("ready", startApp);

app.on("window-all-closed", () => app.quit());