import MeshClient from "../clients/mesh.client";
import UpdateMeshDto from "../clients/dto/mesh/exhibit-update-mesh.dto";
import {getJsonFromMesh} from "../utills/mesh-info.utills";
import {Mesh} from "three";


export default class MeshService {
    private mesh: Mesh
    private client: MeshClient;
    constructor(mesh: Mesh) {
        this.mesh = mesh;
        this.client = new MeshClient();
    }
    update(){
        this.client.update(
            this.mesh.uuid,
            new UpdateMeshDto(getJsonFromMesh(this.mesh)))
            .then((response) => {
            })
            .catch((exception) => {
                console.log('mesh update exception',exception)
            });
    }
}