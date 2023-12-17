import {
    Color,
    FrontSide,
    Material,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    TextureLoader
} from "three";

import ImageClient from "../image.client";
import MaterialEntity, { MaterialType } from "../entities/material.entity";

export default class MaterialFactory {
    private imageClient: ImageClient;
    constructor(private entity: MaterialEntity[]) {
        this.imageClient = new ImageClient()
    }

    create(index: number = 0) {
        let material: Material;
        if(!this.entity[index]){
            return null;
        }
        const entity = this.entity[index];


        const color: Color = new Color(entity.color);

        let texture = null;
        if(entity.texture && entity.texture.image){

           texture = new TextureLoader().load(this.imageClient.getImageFileUrl(entity.texture.image.id));
           texture.uuid = entity.texture.id;
           // @ts-ignore
            texture.wrapS = entity.texture.wrapS;
           // @ts-ignore
            texture.wrapT = entity.texture.wrapT;
        }


        switch (entity.type) {
            case MaterialType.MeshBasicMaterial:
                material = new MeshBasicMaterial({ color, opacity: entity.opacity, map: texture});
                break;
            case MaterialType.MeshLambertMaterial:
                material = new MeshLambertMaterial({ color, opacity: entity.opacity, map: texture });
                break;
            case MaterialType.MeshPhongMaterial:
                material = new MeshPhongMaterial({ color, opacity: entity.opacity, map: texture });
                break;
            default:
                throw Error(`${entity.type}: Material was not correctly generated`);
                break;
        }
        material.uuid = entity.id;
        material.needsUpdate = true;

        return material;
    }

    get(): Material[]{
        const materials= [];
        for(let index=0; index<this.entity.length; index++){
            const material = this.create(index);
            if(material){
                materials.push(material);
            }

        }
        return materials;
    }

}