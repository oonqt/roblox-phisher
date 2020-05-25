const express = require("express");
const config = require("config");
const cors = require("cors");
const Logger = require("./utils/Logger");
const isDev = require("./utils/isDev");
const db = require("./db");
const { name } = require("../package.json");

const app = express();
const logger = new Logger(
	isDev() ? 'console' : 'file',
	config.get('logsPath'),
    config.get('logRetentionCount'),
    name
);

app.use(
	cors({
		origin: isDev() ? "*" : config.get('allowedOrigins'),
		methods: ['GET', 'POST', 'DELETE']
	})
);
app.use(express.json());

app.set("trust proxy", "127.0.0.1");
app.set("logger", logger);

app.listen(config.get("port"), () => logger.info(`Listening on ${config.get("port")}`));

db.connect(config.get('dbconn'))
	.then(() => logger.info("DBCONN Successful"))
	.catch(err => logger.error(`Failed to connect: ${err}`));