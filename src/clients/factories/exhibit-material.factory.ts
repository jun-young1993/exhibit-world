import {
    Color,
    FrontSide,
    Material,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    TextureLoader
} from "three";
import ExhibitMaterialEntity, {MaterialType} from "../entities/exhibit-material.entity";
import ImageClient from "../image.client";

export default class ExhibitMaterialFactory {
    private imageClient: ImageClient;
    constructor(private entity: ExhibitMaterialEntity) {
        this.imageClient = new ImageClient()
    }

    create() {
        let material: Material;

        const color: Color = new Color(this.entity.color);
        // const texture = new TextureLoader().load('');
        let texture = null;
        if(this.entity.texture && this.entity.texture.image){

           texture = new TextureLoader().load(this.imageClient.getImageFileUrl(this.entity.texture.image.id));
           texture.uuid = this.entity.texture.id;
           // @ts-ignore
            texture.wrapS = this.entity.texture.wrapS;
           // @ts-ignore
            texture.wrapT = this.entity.texture.wrapT;
        }
        switch (this.entity.type) {
            case MaterialType.MeshBasicMaterial:
                material = new MeshBasicMaterial({ color, opacity: this.entity.opacity, map: texture, side: FrontSide });
                break;
            case MaterialType.MeshLambertMaterial:
                material = new MeshLambertMaterial({ color, opacity: this.entity.opacity, map: texture });
                break;
            case MaterialType.MeshPhongMaterial:
                material = new MeshPhongMaterial({ color, opacity: this.entity.opacity, map: texture });
                break;
            default:
                    throw Error(`${this.entity.type}: Material was not correctly generated`);
                break;
        }


        material.uuid = this.entity.id;
        material.needsUpdate = true;

        return material;
    }

    get(){
        return this.create();
    }

}