import { v4 as uuid } from "uuid";

export enum MaterialType {
    MeshBasicMaterial = 'MeshBasicMaterial',
    MeshLambertMaterial = 'MeshLambertMaterial',
    MeshPhongMaterial = 'MeshPhongMaterial'
}

export interface MaterialPropsEntity {
    color: string;
    opacity: number;
    type: string;
}
export default interface ExhibitMaterialEntity extends MaterialPropsEntity{
    id: string;
}

export class DefaultExhibitMaterialEntity<ExhibitMaterialEntity> {
    color= '#ffffff';
    id= uuid();
    opacity= 1;
    type= MaterialType.MeshBasicMaterial;
}

