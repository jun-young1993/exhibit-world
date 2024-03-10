import Client from "./client";
import {Mesh, Vector3} from "three";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "./entities/exhibit-mesh.entity";
import CreateBulkMeshDto from "./dto/mesh/exhibit-create-bulk-mesh.dto";
import UpdateMeshDto from "./dto/mesh/exhibit-update-mesh.dto";
import UpdateMaterialDto from "./dto/material/update-material.dto";
import UpdateResult from "./entities/update-result";
import TextureEntity from "./entities/texture.entity";
import CreateTextureDto from "./dto/texture/create-texture.dto";
import UpdateTextureDto from "./dto/texture/update-texture.dto";

export default class TextureClient extends Client {
    constructor() {
        super({
            prefix: '/api/v1/textures'
        });
    }

    /**
     * Create the location of the Texture
     *
     * @param uuid string
     * @param dto CreateTextureDto
     */
    public create(dto: CreateTextureDto): Promise<TextureEntity>
    {
        return new Promise((resolve, reject) => {
            this.fetch(``,{
                method: 'POST',
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


    public update(uuid: string,dto: UpdateTextureDto): Promise<UpdateResult>
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