import Client from "./client";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import {GroupEntity} from "./entities/group.entity";
import {ExhibitEntity} from "./entities/exhibit.entity";
import {v4} from "uuid";

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
                .then((response) => {
                    return response.json();
                })
                .then((exhibit: ExhibitEntity) => {
                    resolve(exhibit)
                })
                .catch((response) => reject(response));
        })
    }
}