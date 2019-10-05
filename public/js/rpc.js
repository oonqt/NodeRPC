const { ipcRenderer, shell } = require("electron");

ipcRenderer.on("infoData", ({}, data) => {
    document.getElementById("version").textContent = document.getElementById("version").textContent.replace("{}", data.version);
    document.getElementById("developer").textContent = document.getElementById("developer").textContent.replace("{}", data.author);
    document.getElementById("license").textContent = document.getElementById("license").textContent.replace("{}", data.license);

    document.getElementById("homepageUrl").textContent = data.homepage;
    document.getElementById("homepageUrl").setAttribute("href", data.homepage);
});

document.getElementById("homepageUrl").addEventListener("click", e => {
    e.preventDefault();
    shell.openExternal(e.target.href);
});

