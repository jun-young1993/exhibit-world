import {Object3D} from "three";
import {Object3DEntity} from "../../entities/object3D.entity";

interface UpdateGroupDtoInterface extends Partial<Object3DEntity> {}

export default class UpdateGroupDto {
    constructor(property: UpdateGroupDtoInterface) {
        Object.assign(this, property)
    }
}

