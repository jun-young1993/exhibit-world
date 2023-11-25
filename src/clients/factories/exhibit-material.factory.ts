import {Material, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial} from "three";
import ExhibitMaterialEntity, {MaterialType} from "../entities/exhibit-material.entity";

export default class ExhibitMaterialFactory {
    constructor(private entity: ExhibitMaterialEntity) {}

    create() {
        let material: Material;

        switch (this.entity.type) {
            case MaterialType.MeshBasicMaterial:
                material = new MeshBasicMaterial({ color: this.entity.color, opacity: this.entity.opacity });
                break;
            case MaterialType.MeshLambertMaterial:
                material = new MeshLambertMaterial({ color: this.entity.color, opacity: this.entity.opacity });
                break;
            case MaterialType.MeshPhongMaterial:
                material = new MeshPhongMaterial({ color: this.entity.color, opacity: this.entity.opacity });
                break;
            default:
                    throw Error(`${this.entity.type}: Material was not correctly generated`);
                break;
        }
        material.uuid = this.entity.id;

        return material;
    }

    get(){
        return this.create();
    }

}