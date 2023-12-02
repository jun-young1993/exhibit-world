import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import UpdateMeshDto from "./dto/mesh/exhibit-update-mesh.dto";
import UpdateGeometryDto from "./dto/geometry/update-geometry.dto";
import UpdateResult from "./entities/update-result";

export default class GeometryClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/geometries'
        });
    }

    /**
     * Update the location of the Geometry
     *
     * @param uuid string
     * @param dto UpdateMeshDto
     */
    public update(uuid: string, dto: UpdateGeometryDto): Promise<UpdateResult>
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
}