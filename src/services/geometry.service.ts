import MeshClient from "../clients/mesh.client";
import UpdateMeshDto from "../clients/dto/mesh/exhibit-update-mesh.dto";
import {
    getGeometryId,
    getJsonFromGeometry,
    getJsonFromMaterial,
    getJsonFromMesh,
    getMaterialId, getMeshesByGroup,
    getSingleMaterial
} from "../utills/mesh-info.utills";
import {Group, Mesh} from "three";
import MaterialClient from "../clients/material.client";
import UpdateMaterialDto from "../clients/dto/material/update-material.dto";
import GeometryClient from "../clients/geometry.client";
import UpdateGeometryDto from "../clients/dto/geometry/update-geometry.dto";
import UpdateResult from "../clients/entities/update-result";
import GroupClient from "../clients/group.client";
import {GroupEntity} from "../clients/entities/group.entity";


export default class GeometryService {

    private client: GeometryClient;
    private groupClient: GroupClient;
    constructor() {

        this.client = new GeometryClient();
        this.groupClient = new GroupClient();
    }
    update(group: Group)
    {
        return new Promise<UpdateResult[]>((resolve, reject) => {
            const updateGeometryPromises: Promise<UpdateResult>[] = [];
            getMeshesByGroup(group).forEach((mesh) => {
                const updateGeometryPromise = this.client.update(
                    getGeometryId(mesh),
                    new UpdateGeometryDto(getJsonFromGeometry(mesh)))


                updateGeometryPromises.push(updateGeometryPromise);
            })

            Promise.all(updateGeometryPromises)
                .then((response) => {
                    resolve(response)
                })
                .catch(reject)
        })



    }
}