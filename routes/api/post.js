const express = require('express');
const Post = require('../../models/Post');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const e = require('express');
const { json } = require('express');

const router = express.Router();

/**
 * route   POST api/post
 * desc    Create a post
 * access  Private
 */
router.post('/', [ auth, [ check('text', 'Text is required').notEmpty() ] ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (user) {
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			return res.json(post);
		} else {
			return res.status(400).json({ msg: 'user is not found' });
		}
	} catch (err) {
		return res.status(500).json({ msg: 'server error' });
	}
});

/**
 * route   GET api/postS
 * desc    Get list of posts
 * access  Private
 */
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });

		return res.json(posts);
	} catch (err) {
		return res.status(500).json({ msg: 'server error' });
	}
});

/**
 * route   GET api/post/:id
 * desc    Get list of posts
 * access  Private
 */
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Post is not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'unauthorized user' });
		}
		return res.json(post);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post is not found' });
		}
		return res.status(500).json({ msg: 'server error' });
	}
});

/**
 * route   DELETE api/post/:id
 * desc    Delete a post
 * access  Private
 */
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Post is not found' });
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'unauthorized user' });
		}
		await post.remove();

		return res.json('post is deleted');
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post is not found' });
		}
		return res.status(500).json({ msg: 'server error' });
	}
});

/**
 * route   PUT api/post/like/:id
 * desc    Like/Unlike a post
 * access  Private
 */
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: 'Post is not found' });
		}
		const pLike = post.likes.findIndex((l) => l.user.toString() === req.user.id);
		if (pLike > -1) {
			post.likes.splice(pLike, 1);
		} else {
			post.likes.unshift({ user: req.user.id });
		}
		await post.save();
		return res.json(post);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post is not found' });
		}
		return res.status(500).json({ msg: 'server error' });
	}
});

/**
 * route   POST api/posts/comment/:id
 * desc    Create a comment for a post
 * access  Private
 */
router.post('/comment/:id', [ auth, [ check('text', 'Text is required').notEmpty() ] ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const user = await User.findById(req.user.id).select('-password');
		const post = await Post.findById(req.params.id);

		if (user && post) {
			post.comments.unshift({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			await post.save();
			return res.json(post.comments);
		} else {
			return res.status(400).json({ msg: 'user or post is not found' });
		}
	} catch (err) {
    console.log(err);
		return res.status(500).json({ msg: 'server error' });
	}
});

/**
 * route   DELETE api/post/comment/:id/:commentId
 * desc    Delete a comment of a post
 * access  Private
 */
router.delete('/comment/:id/:commentId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: 'post is not found' });
		}
		const comment = post.comments.find(c=> c.id === req.params.commentId);
		if (!comment) {
			return res.status(404).json({ msg: 'comment is not found' });
		}

		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'unauthorized access' });
		}
		const commentIndex = post.comments.findIndex(c=> c.id === req.params.commentId);

		post.comments.splice(commentIndex, 1);
		await post.save();
		return res.json(post);
	} catch (err) {
    console.log(err);
		return res.status(500).json({ msg: 'server error' });
	}
});

module.exports = router;
