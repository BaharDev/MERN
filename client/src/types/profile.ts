import { v4 as uuidv4 } from 'uuid';

export type Experience = {
	_id: any;
	title: string;
	company: string;
	location: string;
	from: Date;
	to: Date;
	current: boolean;
	description: string;
};

export type Education = {
	_id: any;
	school: string;
	fieldOfStudy: string;
	degree: string;
	from: Date;
	to: Date;
	current: boolean;
	description: string;
};

export type Social = {
	youtube?: string;
	facebook?: string;
	linkedin?: string;
	twitter?: string;
};

export type User = {
	name: string;
	avatar: string;
	email: string;
	_id: unknown;
};

export type Profile = {
	_id: any;
	user: User;
	company: string;
	bio: string;
	location: string;
	status: string;
	skills: string[];
	githubUserName: string;
	experience: Experience[];
	education: Education[];
	social?: Social;
};
