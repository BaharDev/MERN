export const tokenManager = {
	getToken: () => {
		const token = localStorage.getItem('token');
		if (!token) return;
		const item = JSON.parse(token);
		const now = new Date();
		console.log(item.expiry);
		if (now.getTime() > item.expiry) {
			localStorage.removeItem('token');
			return null;
		}

		return item.value;
	},
	setToken: (token: any) => {
		const item = {
			value: token,
			expiry: new Date().getTime() + 360000,
		};
		localStorage.setItem('token', JSON.stringify(item));
	},
};
