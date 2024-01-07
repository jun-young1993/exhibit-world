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

    /**
     * Relative all GitHub Content
     */
    public findAll(){
        return new Promise<GroupEntity[]>((resolve, reject) => {
            this.fetch('/',{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((groups: GroupEntity[]) => {
                    resolve(groups);
                })
                .catch((exception) => reject(exception));
        })
    }

    public upload(file: File){


        return new Promise<GroupEntity>((resolve, reject) => {
            console.log("=>(github-storage.client.ts:62) file", file);
            const formData = new FormData();
            const reader = new FileReader();
            formData.append('file',file, file.name);
            console.log("=>(github-storage.client.ts:63) formDta", formData);

            this.fetch('',{
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'accept': '*/*'
                },
                body: formData
            })
                .then((response) => response.json())
                .then((groups: GroupEntity) => {
                    console.log("=>(github-storage.client.ts:79) groups", groups);
                    resolve(groups);
                })
                .catch((exception) => reject(exception));




            console.log("=>(github-storage.client.ts:61) formData", formData);

        })
    }
}