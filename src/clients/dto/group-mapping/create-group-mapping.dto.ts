import {GroupMappingEntity} from "../../entities/group-mapping.entity";

export interface CreateGroupMappingDtoInterface {
    name?: GroupMappingEntity['name']
}
export default class CreateGroupMappingDto {
    constructor(props: CreateGroupMappingDtoInterface) {
        Object.assign(this, props);
    }
}