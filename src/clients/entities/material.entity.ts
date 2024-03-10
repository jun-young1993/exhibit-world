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
    type: MaterialType;
    texture?: TextureEntity
}
export default interface MaterialEntity extends MaterialPropsEntity{
    id: string;
}



