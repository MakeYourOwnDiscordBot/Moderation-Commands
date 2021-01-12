const Logger = require('leekslazylogger');
const log = new Logger();
module.exports = async (client) => {
  log.info(`[EXTENSION READY]: サーバー管理コマンドが使用可能です。`);
  require("../loaders/loadCommands")(client);
};