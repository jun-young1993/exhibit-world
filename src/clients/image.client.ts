import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import UpdateMeshDto from "./dto/mesh/exhibit-update-mesh.dto";
import UpdateMaterialDto from "./dto/material/update-material.dto";
import UpdateResult from "./entities/update-result";
import {ImageEntity, ImageType} from "./entities/image.entity";



export default class ImageClient extends Client {

    constructor() {
        super({
            prefix: '/api/v1/images'
        });
    }

    findAllPurpose(purpose: ImageType): Promise<ImageEntity[] | []>
    {
        return new Promise((resolve, reject) => {
            this.fetch(`/purpose/${purpose}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
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

    findAllPurposeByTexture(){
        return this.findAllPurpose(ImageType.Texture);
    }

    getImageFileUrl(uuid: string): string
    {
        return this.getUrl(`/file/${uuid}`)
    }


}