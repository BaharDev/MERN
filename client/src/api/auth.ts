import { config } from './config';
import axios from 'axios';

export type UserApi = {
	getUser(): Promise<any>;
	register(email: string, name: string, password: string): Promise<any>;
	login(email: string, password: string): Promise<any>;
};

export const userApi: UserApi = {
	getUser: async () => {
		return await axios.get('/api/auth', config);
	},
	register: async (email, name, password) => {
		const body = JSON.stringify({ name, email, password });
		return await axios.post('/api/users', body, config);
	},
	login: async (email, password) => {
		const body = JSON.stringify({ email, password });
		return await axios.post('/api/auth', body, config);
	},
};
