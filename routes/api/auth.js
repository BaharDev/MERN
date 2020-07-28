const express = require('express');
const middleware = require('../../middleware/auth');
const User = require('../../models/User');

const route = express.Router();

/**
 * route   GET auth api
 * access  Public
 */
route.get('/', middleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
        console.log(err.message);
		res.status(500).send('some error happened');
	}
});

module.exports = route;
