import { GithubReleaseEntity } from "clients/entities/github.entity";
import GithubClient from "clients/github.client";
import { selector } from "recoil";


const githubClient = new GithubClient();


export const currentReleaseSelector = selector<GithubReleaseEntity>({
	key: 'currentReleaseSelector',
	get: async (): Promise<GithubReleaseEntity> => {
		let release = await githubClient.findByReleas();
		if(release === null){
			return {
				name: 'v0.0.0',
				created_at: new Date(),
				body: '' 
			}
		}
		return release;
	}
});
