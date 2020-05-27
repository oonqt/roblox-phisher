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
	Auth.find({}, {}, { sort: { time: "desc" } }, (err, docs) => {
		if(err) return next (err);

		res.json(docs);
	});
});

module.exports = router;
