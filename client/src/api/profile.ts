import { config } from './config';
import axios from 'axios';
import { Profile } from '../types/profile';

export type ProfileApi = {
	getCurrentProfile(): Promise<any>;
	getProfiles(): Promise<any>;
	createProfile(profile: Profile): Promise<Profile>;
};

export const profileApi: ProfileApi = {
	getProfiles: async () => {
		return await axios.get('/api/profile', config);
	},
	getCurrentProfile: async () => {
		return await axios.get('/api/profile/current', config);
	},
	createProfile: async (profile: Profile) => {
		return await axios.post('/api/profile', profile, config);
	},
};
