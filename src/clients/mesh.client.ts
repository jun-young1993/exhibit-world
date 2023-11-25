import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";

export default class MeshClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/meshes'
        });
    }

    public createBulk(mesh: Mesh){
        console.log(mesh);
        // const dto = new CreateMeshBulkDto(mesh);
        // return this.fetch('/bulk',{
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'accept': '*/*'
        //     },
        //     body: JSON.stringify(dto)
        // })
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