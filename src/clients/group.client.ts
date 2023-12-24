import Client from "./client";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import {GroupEntity} from "./entities/group.entity";
import UpdateGroupDto from "./dto/group/update-group.dto";
import UpdateResult from "./entities/update-result";



export default class GroupClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/groups'
        });
    }

    /**
     * Create Mesh Group
     *
     * @return GroupEntity
     */
    public create(mesh: CreateBulkMeshDto): Promise<GroupEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch('/',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify({
                    mesh: mesh
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((group: GroupEntity) => {
                resolve(group)
            })
            .catch((response) => reject(response));
        })
    }

    /**
     * Create Default Mesh Group
     *
     * @return GroupEntity
     */
    public createDefault(): Promise<GroupEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch('/default',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((group: GroupEntity) => {
                    resolve(group)
                })
                .catch((response) => reject(response));
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

    /**
     * Relative a Group
     */
    public find(uuid: GroupEntity['id']){
        return new Promise<GroupEntity>((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((group: GroupEntity) => {
                    resolve(group);
                })
                .catch((exception) => reject(exception));
        })
    }

    /**
     * group a update
     *
     * @param uuid
     * @param dto
     */
    public update(uuid: GroupEntity['id'], dto: UpdateGroupDto): Promise<UpdateResult>
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(dto)
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((exception) => reject(exception));
        })
    }

    public remove(uuid: GroupEntity['id']): Promise<GroupEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((exception) => reject(exception));
        })
    }
}