const { ipcRenderer, shell } = require("electron");

ipcRenderer.on("data:info", ({}, data) => {
    document.getElementById("version").textContent = document.getElementById("version").textContent.replace("{}", data.version);
    document.getElementById("developer").textContent = document.getElementById("developer").textContent.replace("{}", data.author);
    document.getElementById("license").textContent = document.getElementById("license").textContent.replace("{}", data.license);

    document.getElementById("homepageUrl").textContent = data.homepage;
    document.getElementById("homepageUrl").setAttribute("href", data.homepage);
});

ipcRenderer.on("data:settings", ({}, data) => {
    document.getElementById("runAtStartup").checked = data.runAtStartup;
    document.getElementById("hideToTray").checked = data.hideToTray;
    document.getElementById("clientId").value;
    document.getElementById("state").value;
    document.getElementById("details").value;
    document.getElementById("showTimestamp").checked;
    document.getElementById("smallImageKey").value;
    document.getElementById("smallImageText").value;
    document.getElementById("largeImageKey").value;
    document.getElementById("largeImageText").value;
});

document.getElementById("homepageUrl").addEventListener("click", e => {
    e.preventDefault();
    shell.openExternal(e.target.href);
});

document.getElementById("appearanceSettings").addEventListener("submit", e => {
    e.preventDefault();

    let clientId = document.getElementById("clientId").value;
    let state = document.getElementById("state").value;
    let details = document.getElementById("details").value;
    let showTimestamp = document.getElementById("showTimestamp").checked;
    let smallImageKey = document.getElementById("smallImageKey").value;
    let smallImageText = document.getElementById("smallImageText").value;
    let largeImageKey = document.getElementById("largeImageKey").value;
    let largeImageText = document.getElementById("largeImageText").value;

    ipcRenderer.send("settings:appearance", { clientId, state, details, showTimestamp, smallImageKey, smallImageText, largeImageKey, largeImageText });
});

document.getElementById("appSettings").addEventListener("submit", e => {
    e.preventDefault();
    
    let runAtStartup = document.getElementById("runAtStartup").checked;
    let hideToTray = document.getElementById("hideToTray").checked;
    
    ipcRenderer.send("settings:app", { runAtStartup, hideToTray });
});

document.getElementById("resetSettings").addEventListener("click", () => {
    ipcRenderer.send("settings:reset");
});

document.getElementById("openLogs").addEventListener("click", () => {
    ipcRenderer.send("logs:open");
});