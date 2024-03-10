import Client from "./client";
import {GroupEntity} from "./entities/group.entity";
import {ExhibitEntity} from "./entities/exhibit.entity";
import {v4} from "uuid";
import {GroupMappingEntity} from "./entities/group-mapping.entity";
import {PatchExhibitDtoInterface} from "./dto/exhibit/patch-exhibit.dto";
import { StatusCodes } from "http-status-codes";

export default class ExhibitClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/exhibit'
        });
    }


    /**
     * Create exhibit gltf
     *
     * @return GroupEntity
     */
    public create(gltf: ArrayBuffer): Promise<ExhibitEntity>
    {

        return new Promise((resolve, reject) => {
            const formData = new FormData();
            const file = new Blob([gltf]);
            const filename = `${v4()}.glb`;
            formData.append('file',file,filename);

            this.fetch('/',{
                method: 'post',
                headers: {
                    // 'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: formData
            })
                .then((response: Response) => {
                    if(response.status === StatusCodes.CREATED){
                        return response.json();
                    }
                    return reject(response.statusText);
                    
                })
                .then((exhibit: ExhibitEntity) => {
                    resolve(exhibit)
                })
                .catch((response) => reject(response));
        })
    }

    /**
     * find all exhibit
     */
    public findAll(): Promise<ExhibitEntity[] | []>
    {

        return new Promise((resolve, reject) => {
            this.fetch(``,{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((exhibit: ExhibitEntity[] | []) => {
                    resolve(exhibit);
                })
                .catch((exception) => reject(exception));
        });

    }

    public findOne(uuid: string): Promise<ExhibitEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((exhibit: ExhibitEntity) => {
                    resolve(exhibit);
                })
                .catch((exception) => reject(exception));
        });
    }

    public delete(uuid: string): Promise<ExhibitEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => response.json())
                .then((exhibit: ExhibitEntity) => {
                    resolve(exhibit);
                })
                .catch((exception) => reject(exception));
        });
    }

    public patch(uuid: GroupMappingEntity['id'], patchExhibit: PatchExhibitDtoInterface)
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(patchExhibit)
            })
                .then((response: Response) => {
                    if(response.status === StatusCodes.OK){
                        return response.json();
                    }
                    return reject(response.statusText);
                    
                })
                .then((response) => resolve(response))
                .catch((exception) => reject(exception));
        })
    }
}