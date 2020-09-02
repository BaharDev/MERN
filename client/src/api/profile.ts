import { config } from './config';
import axios from 'axios';
import { Profile, Education, Experience } from '../types/profile';

type ResponseData = {
	data: unknown;
}
export type ProfileApi = {
	getCurrentProfile(): Promise<ResponseData>;
	getProfileById(id: unknown): Promise<ResponseData>;
	getProfiles(): Promise<ResponseData>;
	getRepos(userName: string): Promise<ResponseData>;
	upsertProfile(profile: Profile): Promise<ResponseData>;
	createEducation(education: Education): Promise<ResponseData>;
	createExperience(experience: Experience): Promise<ResponseData>;
	deleteEducation(id: unknown): Promise<ResponseData>;
	deleteExperience(id: unknown): Promise<ResponseData>;
	deleteProfile(): Promise<ResponseData>;
};

export const profileApi: ProfileApi = {
	getProfiles: async () => {
		return await axios.get('/api/profile', config);
	},
	getCurrentProfile: async () => {
		return await axios.get('/api/profile/current', config);
	},
	getProfileById: async (id: unknown) => {
		return await axios.get(`/api/profile/user/${id}`, config);
	},
	getRepos: async (userName: string) => {
		return await axios.get(`/api/profile/github/${userName}`, config);
	},
	upsertProfile: async (profile: Profile) => {
		return await axios.post('/api/profile', profile, config);
	},
	createEducation: async (education: Education) => {
		return await axios.put('/api/profile/education', education, config);
	},
	createExperience: async (experience: Experience) => {
		return await axios.put('/api/profile/experience', experience, config);
	},
	deleteEducation: async (id: any) => {
		return await axios.delete(`/api/profile/education/${id}`, config);
	},
	deleteExperience: async (id: any) => {
		return await axios.delete(`/api/profile/experience/${id}`, config);
	},
	deleteProfile: async () => {
		return await axios.delete(`/api/profile`, config);
	},
};
