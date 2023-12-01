import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";
import CreateBulkMeshDto from "./dto/exhibit-create-bulk-mesh.dto";
import CreateUpdateMeshDto from "./dto/exhibit-update-mesh.dto";

export default class MeshClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/meshes'
        });
    }

    public createBulk(dto: CreateBulkMeshDto): Promise<ExhibitMeshEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch('/bulk',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(dto)
            })
            .then((response) => {
                return response.json();
            })
            .then(({mesh}: {mesh: ExhibitMeshEntity}) => {
                
                resolve(mesh)
            })
            .catch((response) => reject(response));
        })

    }

    public update(uuid: string, dto: CreateUpdateMeshDto)
    {

        return new Promise((resolve, reject) => {
            this.fetch(`/${uuid}`,{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify(dto)
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log('update mesh',response)
                resolve(response)
            })
            .catch((response) => reject(response));
        })
    }
    


    public findAll(): Promise<ExhibitMeshEntities>
    {
        return new Promise((resolve, reject) => {
            this.fetch('/bulk',{
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((response: ExhibitMeshEntities) => {
                    resolve(response)
                })
                .catch((response) => reject(response));
        })

    }
}