import { config } from './config';
import axios from 'axios';

type ResponseData = {
	data: unknown;
}
export type PostsApi = {
	getPosts(): Promise<ResponseData>;
	getPost(id: unknown): Promise<ResponseData>;
    createPost(text: string): Promise<ResponseData>;
    createComment(text: string, postId: unknown): Promise<ResponseData>;
	deletePost(id: unknown): Promise<ResponseData>;
	deleteComment(postId: unknown, commentId: unknown): Promise<ResponseData>;
	reactToPost(id: unknown): Promise<ResponseData>;
};

export const postsApi: PostsApi = {
	getPosts: async () => {
		return await axios.get('/api/posts', config);
	},
	getPost: async (id: unknown) => {
		return await axios.get(`/api/posts/${id}`, config);
	},
	createPost: async (text: string) => {
		return await axios.post(`/api/posts`, text, config);
    },
    createComment: async (text: string, postId: unknown) => {
		return await axios.post(`/api/posts/comment/${postId}`, text, config);
	},
	deletePost: async (id: any) => {
		return await axios.delete(`/api/posts/${id}`, config);
	},
	deleteComment: async (postId: any, commentId: unknown) => {
		return await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);
	},
	reactToPost: async (id: any) => {
		return await axios.put(`/api/posts/like/${id}`, config);
	}
};
