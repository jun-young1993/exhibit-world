import MeshClient from "../clients/mesh.client";
import UpdateMeshDto from "../clients/dto/mesh/exhibit-update-mesh.dto";
import {getJsonFromMaterial, getJsonFromMesh, getMaterialId, getSingleMaterial} from "../utills/mesh-info.utills";
import {Material, Mesh, TextureLoader} from "three";
import MaterialClient from "../clients/material.client";
import UpdateMaterialDto from "../clients/dto/material/update-material.dto";
import {ImageEntity} from "../clients/entities/image.entity";
import TextureClient from "../clients/texture.client";
import CreateTextureDto from "../clients/dto/texture/create-texture.dto";
import ImageClient from "../clients/image.client";
import ExhibitMeshFactory from "../clients/factories/exhibit-mesh.factory";
import ExhibitMaterialEntity from "../clients/entities/exhibit-material.entity";
import PropertyMissingError from "../Exception/PropertyMissingError";


export default class MaterialService {
    private mesh: Mesh
    private client: MaterialClient;
    private textureClient: TextureClient;
    private imageClient: ImageClient;
    constructor(mesh: Mesh) {
        this.mesh = mesh;
        this.client = new MaterialClient();
        this.textureClient = new TextureClient();
        this.imageClient = new ImageClient();
    }

    async updateTexture(image: ImageEntity) {
        const material = getSingleMaterial(this.mesh) as Material;
        if ('map' in material) {
            let texture = material.userData.texture;
            if (material.map !== null || material.map !== undefined) {
                texture = await this.textureClient.create(new CreateTextureDto(image));
                getSingleMaterial(this.mesh).userData.texture = texture;
            }else{
                if(!('uuid' in material.map)){
                    throw new PropertyMissingError('uuid')
                }
                // @ts-ignore
                await this.textureClient.update(material.map.uuid,{
                    image: image
                })
            }



            this.update();
            const textureLoader = new TextureLoader().load(
                this.imageClient.getImageFileUrl(image.id),
                () => {
                    material.map = textureLoader;
                    material.needsUpdate = true;
                }
            );
        }


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