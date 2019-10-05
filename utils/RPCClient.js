const { Client } = require("discord-rpc");

class RPCClient extends Client {
    constructor() {
        super();
    }
}

module.exports = RPCClient;