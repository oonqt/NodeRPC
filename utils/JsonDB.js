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
        fs.writeFileSync(this.dbfile, JSON.stringify({ ...this.data, ...data }));
    }
}

module.exports = JsonDB;