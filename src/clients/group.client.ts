import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import UpdateMeshDto from "./dto/mesh/exhibit-update-mesh.dto";
import UpdateResult from "./entities/update-result";
import {GroupEntity} from "./entities/group.entity";

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
}