const express = require('express');
const config = require('config');
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');
const Logger = require('./utils/Logger');
const isDev = require('./utils/isDev');
const authenticator = require("./middleware/authentication");
const db = require('./db');
const { name } = require('../package.json');

const app = express();
const logger = new Logger(
	isDev() ? 'console' : 'file',
	config.get('logsPath'),
	config.get('logRetentionCount'),
	name
);

app.use(
	cors({
		origin: isDev() ? '*' : config.get('allowedOrigins'),
		methods: ['GET', 'POST', 'DELETE']
	})
);
app.use(
	morgan(
		'IP: :remote-addr - :method :url Response Time: :response-time Status: :status UserAgent: :user-agent',
		{ stream: logger.stream }
	)
);
app.use(express.json());


app.set('trust proxy', '127.0.0.1');
app.set('logger', logger);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/accounts', authenticator, require('./routes/accounts'));

app.use("/*", express.static(path.join("..", "client", "build"), {
	extensions: ["html"]
}));

app.use((req, res, next) => {
	res.status(404).json({ msg: "Not found" });
})

app.use((err, req, res, next) => {
	res.status(500).json({ msg: "Internal server error" });
	logger.error(err);
})

app.listen(config.get('port'), () =>
	logger.info(`Listening on ${config.get('port')}`)
);

db.connect(config.get('dbconn'))
	.then(() => logger.info('DBCONN Successful'))
	.catch((err) => logger.error(`Failed to connect: ${err}`));
