import { v4 as uuid } from "uuid";

export enum MaterialType {
    MeshBasicMaterial = 'MeshBasicMaterial',
    MeshLambertMaterial = 'MeshLambertMaterial',
    MeshPhongMaterial = 'MeshPhongMaterial'
}

export default interface ExhibitMaterialEntity {
    color: string;
    id: string;
    opacity: number;
    type: string;
}

export class DefaultExhibitMaterialEntity<ExhibitMaterialEntity> {
    color= '#ffffff';
    id= uuid();
    opacity= 1;
    type= MaterialType.MeshBasicMaterial;
}

