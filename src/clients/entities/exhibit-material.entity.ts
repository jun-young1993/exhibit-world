import { v4 as uuid } from "uuid";
import TextureEntity from "./texture.entity";

export enum MaterialType {
    MeshBasicMaterial = 'MeshBasicMaterial',
    MeshLambertMaterial = 'MeshLambertMaterial',
    MeshPhongMaterial = 'MeshPhongMaterial',
    MeshStandardMaterial = 'MeshStandardMaterial'
}

export interface MaterialPropsEntity {
    color: string;
    opacity: number;
    type: string;
    texture?: TextureEntity
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

