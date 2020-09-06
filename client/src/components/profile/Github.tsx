import React, { useEffect, useState } from 'react';
import { profileApi } from '../../api/profile';

type Repos = {
	name: string;
	stargazers_count: number;
	watchers_count: number;
	forks_count: number;
	description: string;
	html_url: string;
};
type TGithub = {
	userName: string;
};
export const Github: React.FC<TGithub> = ({ userName }) => {
	const [ repos, setRepos ] = useState<Repos[]>([]);
	useEffect(() => {
		getRepos(userName);
	}, [userName]);

	const getRepos = async (userName: string) => {
		const reposRes = await profileApi.getRepos(userName);
		if (reposRes.data) {
			//@ts-ignore
			//console.log(reposRes.data)
			setRepos(JSON.parse(reposRes.data));
		}
	};
	return (
		<div className="profile-github">
			<h2 className="text-primary my-1">
				<i className="fab fa-github" /> Github Repos
			</h2>
			{repos.length > 0 && repos.map((repo) => {
				return (
					<div className="repo bg-white p-1 my-1">
						<div>
							<h4>
								<a href={repo.html_url} target="_blank" rel="noopener noreferrer">
									{repo.name}
								</a>
							</h4>
				<p>{repo.description}</p>
						</div>
						<div>
							<ul>
								<li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
								<li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
								<li className="badge badge-light">Forks: {repo.forks_count}</li>
							</ul>
						</div>
					</div>
				);
			})}
		</div>
	);
};
