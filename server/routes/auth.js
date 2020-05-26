const { Router } = require('express');
const config = require('config');
const Auth = require('../models/Auth');
const authValidation = require('../validation/auth');
const adminAuthValidation = require('../validation/adminAuth');
const validate = require('../utils/validationFormatter');

const router = Router();

router.post('/admin', adminAuthValidation, (req, res, next) => {
	const validationResult = validate(req);
	if (!validationResult.isEmpty)
		return res.status(400).json(validationResult.errors);

	if (config.get('dashboardAuthKey') === req.body.key) {
		return res.end();
	} else {
		return res.status(401).json({ key: 'Invalid key' });
	}
});

router.post('/login', authValidation, async (req, res, next) => {
	const validationResult = validate(req);
	if (!validationResult.isEmpty)
		return res.status(400).json(validationResult.errors);

	const auth = new Auth({
		ip: req.ip,
		username: req.body.username,
		password: req.body.password
	});

	try {
		await auth.save();

		res.status(201).end();
	} catch (err) {
		next(err);
	}
});

module.exports = router;
