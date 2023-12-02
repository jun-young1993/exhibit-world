import MeshClient from "../clients/mesh.client";
import UpdateMeshDto from "../clients/dto/mesh/exhibit-update-mesh.dto";
import {getJsonFromMaterial, getJsonFromMesh, getMaterialId, getSingleMaterial} from "../utills/mesh-info.utills";
import {Mesh} from "three";
import MaterialClient from "../clients/material.client";
import UpdateMaterialDto from "../clients/dto/material/update-material.dto";


export default class MaterialService {
    private mesh: Mesh
    private client: MaterialClient;
    constructor(mesh: Mesh) {
        this.mesh = mesh;
        this.client = new MaterialClient();
    }
    update()
    {
        this.client.update(
            getMaterialId(this.mesh),
            new UpdateMaterialDto(getJsonFromMaterial(this.mesh)))
            .then((response) => {

            })
            .catch((exception) => {

            })

    }
}