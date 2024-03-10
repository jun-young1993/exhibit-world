import Client from "./client";
import {GroupEntity} from "./entities/group.entity";
import {GithubStorageContentEntity, GithubStorageEntity} from "./entities/github-storage.entity";

export default class GithubStorageClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/github-storage'
        });
    }

    /**
     * Relative a GitHub Content
     *
     * @param uuid
     */
    public findOne(uuid: string){
        const currentDate = new Date();
        return new Promise<GithubStorageContentEntity>((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((groups: GithubStorageContentEntity) => {
                    resolve(groups);
                })
                .catch((exception) => reject(exception));
        })
    }
}