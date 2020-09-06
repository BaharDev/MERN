import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { postActions } from '../../actions/posts';
import { Post } from '../../types/post';
import Moment from 'react-moment';
import CreatePost from './CreatePost';
import { Link } from 'react-router-dom';

export type Posts = {
	posts: Post[];
	user: any;
	getPosts(): Promise<void>;
	likeOrUnlikePost(postId: unknown): Promise<void>;
	deletePost(postId: unknown): Promise<void>;
};
const Posts: React.FC<Posts> = ({ posts, user, getPosts, likeOrUnlikePost, deletePost }) => {
	useEffect(
		() => {
			getPosts();
		},
		[ getPosts ]
	);
	return (
		<section className="container">
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community!
			</p>
			<CreatePost />
			<div className="posts">
				{posts &&
					posts.map((post) => {
						return (
							<div className="post bg-white p-1 my-1">
								<div>
									<Link to={`/post/${post._id}`}>
										<img className="round-img" src={`${post.avatar}?s=200`} alt="" />
										<h4>{post.name}</h4>
									</Link>
								</div>
								<div>
									<p className="my-1">{post.text}</p>
									<p className="post-date">
										Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
									</p>
									<button
										type="button"
										className="btn btn-light"
										onClick={(e) => likeOrUnlikePost(post._id)}
									>
										<i className="fas fa-thumbs-up" />
										<span>{post.likes.length > 0 ? post.likes.length : ''}</span>
									</button>
									<Link to={`/post/${post._id}`} className="btn btn-primary">
										Discussion <span className="comment-count">{post.comments.length}</span>
									</Link>
									{post.user === user._id && (
										<button
											type="button"
											className="btn btn-danger"
											onClick={(e) => deletePost(post._id)}
										>
											<i className="fas fa-times" />
										</button>
									)}
								</div>
							</div>
						);
					})}
			</div>
		</section>
	);
};

const mapStateToProps = (state) => ({
	posts: state.post.posts,
	user: state.auth.user
});

export default connect(mapStateToProps, { ...postActions })(Posts);
