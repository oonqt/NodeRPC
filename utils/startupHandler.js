class StartupHandler {
    constructor(_app) { 
        this.app = _app;
    }

    get isEnabled() {
        return this.app.getLoginItemSettings().openAtLogin;
    }

    enable() {
        this.app.setLoginItemSettings({
            openAtLogin: true
        });
    }

    disable() {
        this.app.setLoginItemSettings({
            openAtLogin: false
        });
    }
}

module.exports = StartupHandler;