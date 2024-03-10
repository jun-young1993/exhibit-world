import {GroupMappingEntity} from "../../entities/group-mapping.entity";

export interface PatchGroupMappingDtoInterface {
    name?: GroupMappingEntity['name']
    ambientLightIntensity?: GroupMappingEntity['ambientLightIntensity']
}
export default class PatchGroupMappingDto {
    constructor(props: PatchGroupMappingDtoInterface) {
        Object.assign(this, props);
    }
}