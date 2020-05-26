const { Router } = require('express');
const Auth = require('../models/Auth');

const router = Router();

router.delete('/:id', (req, res, next) => {
	Auth.findByIdAndDelete(req.params.id, (err, doc) => {
		if (err) return next(err);

		if (doc) {
			return res.status(204).end();
		} else {
			return res.status(404).end();
		}
	});
});

router.get('/', (req, res, next) => {
    Promise.all([Auth.find({}, {}, { sort: { time: "desc" } }), Auth.countDocuments()])
		.then((values) => {
			return res.json({
				accounts: values[0],
				count: values[1]
			});
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
