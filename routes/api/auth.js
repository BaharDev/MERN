const express = require('express');
const middleware = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();

/**
 * route   GET auth api
 * Register
 * access  Public
 */
router.get('/', middleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('some error happened');
	}
});

/**
 * route   POST auth api
 * Login
 * access  Public
 */
router.post(
	'/',
	[ check('password', 'Password is required').exists(), check('email', 'Email is not valid').isEmail() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { email, password } = req.body;

			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: { msg: 'Invalid credentials' } });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: { msg: 'Invalid credentials' } });
			}
			const payLaod = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payLaod,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				},
			);
		} catch (error) {
			console.log(`some error happened while sign in the user with msg ${error.message}`);
			return res.status(500).send('something went wrong while sign in the user');
		}
	},
);

module.exports = router;
