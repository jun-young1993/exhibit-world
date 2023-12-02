import MeshClient from "../clients/mesh.client";
import UpdateMeshDto from "../clients/dto/mesh/exhibit-update-mesh.dto";
import {
    getGeometryId,
    getJsonFromGeometry,
    getJsonFromMaterial,
    getJsonFromMesh,
    getMaterialId,
    getSingleMaterial
} from "../utills/mesh-info.utills";
import {Mesh} from "three";
import MaterialClient from "../clients/material.client";
import UpdateMaterialDto from "../clients/dto/material/update-material.dto";
import GeometryClient from "../clients/geometry.client";
import UpdateGeometryDto from "../clients/dto/geometry/update-geometry.dto";


export default class GeometryService {
    private mesh: Mesh
    private client: GeometryClient;
    constructor(mesh: Mesh) {
        this.mesh = mesh;
        this.client = new GeometryClient();
    }
    update()
    {

        this.client.update(
            getGeometryId(this.mesh),
            new UpdateGeometryDto(getJsonFromGeometry(this.mesh)))
            .then((response) => {
                console.log(response);
            })
            .catch((exception) => {
                console.log(exception);
            })

    }
}