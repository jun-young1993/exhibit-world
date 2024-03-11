import Client from "./client";
import {GroupEntity} from "./entities/group.entity";
import {GithubStorageContentEntity, GithubStorageEntity} from "./entities/github-storage.entity";
import { GithubReleaseEntity } from "./entities/github.entity";

export default class GithubClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/github'
        });
    }

    /**
     * Relative a GitHub Releases Content
     *
     * @param uuid
     */
    public findByReleases(){
        
        return new Promise<GithubReleaseEntity[] | []>((resolve, reject) => {
            this.fetch(`/releases`,{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((releases: GithubReleaseEntity[] | []) => {
                    resolve(releases);
                })
                .catch((exception) => reject(exception));
        })
    }

    public findByReleas(){
        
        return new Promise<GithubReleaseEntity| null>((resolve, reject) => {
            this.fetch(`/release`,{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((releases: GithubReleaseEntity | null) => {
                    resolve(releases);
                })
                .catch((exception) => reject(exception));
        })
    }
}