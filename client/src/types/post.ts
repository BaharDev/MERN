import { User } from './profile';

export type Like = {
	user: User;
};

export type Comment = {
	_id: any;
	name: string;
	avatar: string;
	user: unknown;
	date: Date;
	text: string;
};

export type Post = {
	_id: any;
	name: string;
	avatar: string;
	user: unknown;
	likes: Like[];
	comments: Comment[];
	date: Date;
	text: string;
};
