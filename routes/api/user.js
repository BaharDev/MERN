const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();

/**
 * route   POST user api
 * access  Public
 */
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('password', 'Password should be 6 characters or longer').isLength({ min: 6 }),
		check('email', 'Email is not valid').isEmail(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const { name, email, password } = req.body;

			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ errors: { msg: 'User already exists' } });
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
			});

			user = new User({
				name,
				email,
				avatar,
				password,
			});
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

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
			console.log(`some error happened while registering the user with msg ${error.message}`);
			return res.status(500).send('something went wrong while registering the user');
		}
	},
);

module.exports = router;
