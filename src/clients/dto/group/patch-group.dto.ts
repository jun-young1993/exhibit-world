import {GroupEntity} from "../../entities/group.entity";

export interface PatchGroupInterface {
    name: GroupEntity['name']
}
export default class PatchGroupDto {
    constructor(props: PatchGroupInterface) {
        Object.assign(this, props);
    }
}