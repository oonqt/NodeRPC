const fs = require("fs");

class JsonDB {
    constructor(_dbfile) {
        this.dbfile = _dbfile
    }

    get data() {
        if(!fs.existsSync(this.dbfile)) {
            return {};
        } else {
            return JSON.parse(fs.readFileSync(this.dbfile, "utf8"));
        }
    }

    save(data) {
        if(!fs.existsSync(this.dbfile)) {
            fs.writeFileSync(this.dbfile, JSON.stringify(data));
        } else {
            fs.appendFileSync(this.dbfile, JSON.stringify(data));
        }
    }
}

module.exports = JsonDB;