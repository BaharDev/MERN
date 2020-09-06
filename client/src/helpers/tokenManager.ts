export const tokenManager = {
	getToken: () => {
		const token = localStorage.getItem('token');
		if (!token) return;
		const item = JSON.parse(token);
		const now = new Date();
		if (now.getTime() > item.expiry) {
			localStorage.removeItem('token');
			return null;
		}

		return item.value;
	},
	setToken: (token: any) => {
		const ttl = 1000 * 60 * 60;
		const item = {
			value: token,
			expiry: new Date().getTime() + ttl,
		};
		localStorage.setItem('token', JSON.stringify(item));
	},
};
