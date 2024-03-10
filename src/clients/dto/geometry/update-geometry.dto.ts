import {GeometryPropsEntity} from "../../entities/exhibit-geometry.entity";

export interface UpdateGeometryInterface extends Partial<GeometryPropsEntity> {}
export default class UpdateGeometryDto {
    constructor(property: UpdateGeometryInterface) {
        Object.assign(this, property);
    }
}