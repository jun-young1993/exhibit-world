import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import UpdateMeshDto from "./dto/mesh/exhibit-update-mesh.dto";
import UpdateResult from "./entities/update-result";

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

    /**
     * Update the location of the Material
     *
     * @param uuid string
     * @param dto UpdateMeshDto
     */
    public update(uuid: string, dto: UpdateMeshDto): Promise<UpdateResult>
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
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                resolve(response)
            })
            .catch((exception) => reject(exception));
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