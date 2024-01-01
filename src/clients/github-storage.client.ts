import Client from "./client";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import {GroupEntity} from "./entities/group.entity";
import UpdateGroupDto from "./dto/group/update-group.dto";
import UpdateResult from "./entities/update-result";
import {GithubStorageContentEntity, GithubStorageEntity} from "./entities/github-storage.entity";



export default class GithubStorageClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/github-storage'
        });
    }

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
     * Relative all Groups
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
}