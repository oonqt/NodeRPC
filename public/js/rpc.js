const { ipcRenderer, shell } = require("electron");

ipcRenderer.on("data:info", ({}, data) => {
    document.getElementById("version").textContent = document.getElementById("version").textContent.replace("{}", data.version);
    document.getElementById("developer").textContent = document.getElementById("developer").textContent.replace("{}", data.author);
    document.getElementById("license").textContent = document.getElementById("license").textContent.replace("{}", data.license);

    document.getElementById("homepageUrl").textContent = data.homepage;
    document.getElementById("homepageUrl").setAttribute("href", data.homepage);
});

ipcMain.on("data:appearance", ({}, data) => {

});

ipcRenderer.on("data:settings", ({}, data) => {

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


});