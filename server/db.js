const mongoose = require('mongoose');

const connect = (dbconn) => {
    return new Promise((resolve, reject) => {
		mongoose
			.connect(dbconn, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            })
			.then(() => resolve(dbconn))
			.catch((err) => reject(err));
	});
};

module.exports.connect = connect;
