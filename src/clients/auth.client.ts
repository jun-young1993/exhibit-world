import Client from "./client";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import {GroupEntity} from "./entities/group.entity";
import {ExhibitEntity} from "./entities/exhibit.entity";
import {v4} from "uuid";
import {GithubStorageContentEntity} from "./entities/github-storage.entity";
import LoginDto from "./dto/auth/login.dto";
import UserEntity from "./entities/user.entity";

export default class AuthClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/auth'
        });
    }


    /**
     * user login
     *
     * @return GroupEntity
     */
    public login(loginDto: LoginDto): Promise<UserEntity>
    {

        return new Promise((resolve, reject) => {

            this.fetch('/login',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(loginDto)
            })
                .then((response) => {
                    
                    return response.json();
                })
                .then((response: UserEntity) => {
                    resolve(response);
                })
                .catch((response) => reject(response));
        })
    }

    public logout(): Promise<any>
    {

        return new Promise((resolve, reject) => {

            this.fetch('/logout',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => {
                    
                    return response.json();
                })
                .then(() => {
                    resolve(null);
                })
                .catch((response) => reject(response));
        })
    }

    public profile(): Promise<UserEntity>
    {
        return new Promise((resolve, reject) => {

            this.fetch('/profile',{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((response: UserEntity) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((response) => reject(response));
        })
    }

  
}