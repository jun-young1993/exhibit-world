import Client from "./client";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import {GroupEntity} from "./entities/group.entity";
import UpdateGroupDto from "./dto/group/update-group.dto";
import UpdateResult from "./entities/update-result";
import {v4} from "uuid";
import PatchGroupDto, {PatchGroupInterface} from "./dto/group/patch-group.dto";
import {GroupMappingEntity} from "./entities/group-mapping.entity";



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
    public create(groupMappingId: GroupMappingEntity['id'], file: File): Promise<GroupEntity>
    {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file',file, file.name);
            this.fetch(`/mapping/${groupMappingId}`,{
                method: 'post',
                headers: {
                    'accept': '*/*'
                },
                body: formData
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
    public findAll(groupMappingUUID: string){
        return new Promise<GroupEntity[]>((resolve, reject) => {

            this.fetch(`/mapping/${groupMappingUUID}`,{
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
     * @param uuid string
     * @param gltf ArrayBuffer
     */
    public update(uuid: GroupEntity['id'], gltf: ArrayBuffer)
    {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const file = new Blob([gltf]);
            const filename = `${v4()}.glb`;
            formData.append('file',file,filename);

            this.fetch(`/${uuid}`,{
                method: 'post',
                headers: {
                    'accept': '*/*'
                },
                body: formData
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

    public patch(uuid: GroupEntity['id'], patchGroupDto: PatchGroupInterface)
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(patchGroupDto)
            })
                .then((response) => response.json())
                .then((response) => resolve(response))
                .catch((exception) => reject(exception));
        })
    }
}