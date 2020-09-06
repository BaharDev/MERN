import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postActions } from '../../actions/posts';
import { connect } from 'react-redux';
import { Post } from '../../types/post';
import Moment from 'react-moment';
import CreateComment from './CreateComment';

export type TPost = {
	post: Post;
	match: unknown;
	user: any;
	getPost(id: unknown): Promise<void>;
	deleteComment(postId: unknown, commentId: unknown): Promise<void>;
};
export const PostDetail: React.FC<TPost> = ({ post, user, match, getPost, deleteComment }) => {
	const [ postId, setPostId ] = useState(null);
	useEffect(() => {
		//@ts-ignore
		const id = match.params.id;
		if (id) {
			setPostId(id);
			getPost(id);
		}
	}, []);
	return (
		<section className="container">
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<div className="post bg-white p-1 my-1">
				<div>
					<Link to={`/user-profile/${post.user}`}>
						<img className="round-img" src={`${post.avatar}?s=200`} alt="" />
						<h4>{post.name}</h4>
					</Link>
				</div>
				<div>
					<p className="my-1">{post.text}</p>
				</div>
			</div>

			<CreateComment postId={postId} />

			<div className="comments">
				{post.comments &&
					post.comments.map((comment) => {
						return (
							<div className="post bg-white p-1 my-1">
								<div>
									<a href="profile.html">
										<img className="round-img" src={`${comment.avatar}?s=200`} alt="" />
										<h4>{comment.name}</h4>
									</a>
								</div>
								<div>
									<p className="my-1">{comment.text}</p>
									<p className="post-date">
										{"Posted on "}<Moment format="YYYY/MM/DD">{comment.date}</Moment>{' '}
									</p>
									{comment.user === user._id && (
										<button
											type="button"
											className="btn btn-danger"
											onClick={(e) => deleteComment(post._id, comment._id)}
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
	post: state.post.post,
	user: state.auth.user
});

export default connect(mapStateToProps, { ...postActions })(PostDetail);
