const express = require('express');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const Post = require('../../models/Post');

const router = express.Router();

/**
 * route   /current
 * desc    GET current profile api
 * access  Private
 */
router.get('/current', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'name', 'avatar' ]);

		if (!profile) {
			res.status(400).json({ msg: 'no profile was found for the given user' });
		}

		res.json(profile);
		return next();
	} catch (err) {
		console.error(err.message);
		res.status(500).json('server error');
	}
});

/**
 * route   POST /
 * desc    create or update profile
 * access  Private
 */
router.post(
	'/',
	[ auth, [ check('status', 'Status is required').notEmpty(), check('skills', 'Skills is required').notEmpty() ] ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			githubUserName,
			status,
			skills,
			bio,
			website,
			company,
			location,
			youtube,
			facebook,
			twitter,
			linkedin,
			education,
		} = req.body;

		const userProfile = {};
		userProfile.user = req.user.id;
		userProfile.status = status;
		userProfile.skills = skills.split(',').map((o) => o.trim());
		if (bio) userProfile.bio = bio;
		if (website) userProfile.website = website;
		if (company) userProfile.company = company;
		if (githubUserName) userProfile.githubUserName = githubUserName;
		if (education) userProfile.education = education;
		if (location) userProfile.location = location;
		userProfile.social = {};
		if (youtube) userProfile.social.youtube = youtube;
		if (facebook) userProfile.social.facebook = facebook;
		if (twitter) userProfile.social.twitter = twitter;
		if (linkedin) userProfile.social.linkedin = linkedin;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: userProfile }, { new: true });
				return res.json(profile);
			} else {
				profile = new Profile(userProfile);
			}

			await profile.save();

			res.json(profile);
			return next();
		} catch (err) {
			console.error(err.message);
			res.status(500).json('server error');
		}
	},
);

/**
 * route GET api/profile
 * desc  Get the list of profiles
 */
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'name', 'avatar', 'email' ]);
		res.json(profiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).json('server error');
	}
});

/**
 * route GET ap/profile/user/:user_id
 * desc  Get the profile by UserId
 */
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar', 'email' ]);

		if (!profile) {
			res.status(400).json({ msg: 'profile not found' });
		}
		res.json(profile);
		return next();
	} catch (err) {
		console.log(err);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'profile not found' });
		}

		res.status(500).json('server error');
	}
});

/**
 * route DELETE api/profile/user/:user_id
 * desc  Delete the profile and the user
 * access private
 */
router.delete('/', auth, async (req, res) => {
	try {
		await Post.deleteMany({user: req.user.id });
		await Profile.findOneAndDelete({ user: req.user.id });
		await User.findOneAndDelete({ _id: req.user.id });

		res.json('user is deleted');
	} catch (err) {
		console.log(err.message);
		res.status(500).json('server error');
	}
});

/**
 * route   PUT api/profile/experience
 * desc    update profile experience
 * access  Private
 */
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').notEmpty(),
			check('company', 'Company is required').notEmpty(),
			check('location', 'Location is required').notEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { title, company, location, from, to, current, description } = req.body;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				profile.experience.unshift({ title, company, location, from, to, current, description });

				await profile.save();

				res.json(profile);
				return next();
			}

			return res.status(400).json({ msg: 'Profile not found' });
		} catch (err) {
			console.error(err.message);
			return res.status(500).json('server error');
		}
	},
);

/**
 * route   DELETE api/profile/experience/:exp_id
 * desc    delete profile experience
 * access  Private
 */
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.user.id });

		if (profile) {
			const experienceIndex = profile.experience.findIndex((o) => o.id === req.params.exp_id);
			if (experienceIndex !== -1) {
				profile.experience.splice(experienceIndex, 1);
				await profile.save();
			} else {
				return res.status(400).json({ msg: 'Experience not found' });
			}

			res.json(profile);
			return next();
		}

		return res.status(400).json({ msg: 'Profile not found' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json('server error');
	}
});

/**
 * route   PUT api/profile/education
 * desc    create profile education
 * access  Private
 */
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required').notEmpty(),
			check('fieldOfStudy', 'Field Of Study is required').notEmpty(),
			check('degree', 'Degree is required').notEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { school, fieldOfStudy, degree, from, to, current, description } = req.body;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				profile.education.unshift({ school, fieldOfStudy, degree, from, to, current, description });

				await profile.save();

				res.json(profile);
				return next();
			}

			return res.status(400).json({ msg: 'Profile not found' });
		} catch (err) {
			console.error(err.message);
			return res.status(500).json('server error');
		}
	},
);

/**
 * route   DELETE api/profile/education/:edu_id
 * desc    delete profile education
 * access  Private
 */
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({ user: req.user.id });

		if (profile) {
			const educationIndex = profile.education.findIndex((o) => o.id === req.params.edu_id);
			if (educationIndex !== -1) {
				profile.education.splice(educationIndex, 1);
				await profile.save();
			} else {
				return res.status(400).json({ msg: 'Education not found' });
			}

			res.json(profile);
			return next();
		}

		return res.status(400).json({ msg: 'Profile not found' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json('server error');
	}
});

/**
 * route   GET api/profile/github/:username
 * desc    Get user repos from github
 * access  Public
 */
router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/BaharDev/repos?per_page=5?sort=created:asc`,
			method: 'GET',
			headers: { 'User-Agent': 'node.js' },
		};
		request(options, (error, response, body) => {
			if (error) console.log(error);
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'Github Profile not found' });
			}

			res.json(body);
		});
	} catch (err) {
		console.error(err.message);
		return res.status(500).json('server error');
	}
});
module.exports = router;
