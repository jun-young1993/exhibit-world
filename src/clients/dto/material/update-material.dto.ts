import {MaterialPropsEntity} from "../../entities/exhibit-material.entity";


export interface UpdateMaterialInterface extends Partial<MaterialPropsEntity> {}
export default class UpdateMaterialDto {
    constructor(property: UpdateMaterialInterface) {
        Object.assign(this, property);
    }
}