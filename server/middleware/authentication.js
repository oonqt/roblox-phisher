const config = require('config');

/**
 * @param {import("express").Request} req
 * @param {import("express").response} res
 * @param {function} next
 */
module.exports = (req, res, next) => {
	const key = req.header('authorization');

	if (!key) return res.status(401).json({ msg: 'Not authorized' });

	if (key !== config.get('dashboardAuthKey'))
		return res.status(401).json({ msg: 'Not authorized' });

	next();
};
