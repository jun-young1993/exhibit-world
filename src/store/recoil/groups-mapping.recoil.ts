import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from "recoil"
import GroupClient from "../../clients/group.client";
import {GroupEntity} from "../../clients/entities/group.entity";
import {selectGroupAtom} from "./select-group.recoil";
import PatchGroupDto, {PatchGroupInterface} from "../../clients/dto/group/patch-group.dto";
import UnauthrizedException from "Exception/unauthrized.exception";
import GroupMappingClient from "clients/group-mapping.client";
import { GroupMappingEntity } from "clients/entities/group-mapping.entity";

const groupMappingClient = new GroupMappingClient();

export const groupMappingSelector = selector<GroupMappingEntity[] | []>({
    key: 'groupMappingSelector',
    get: async (): Promise<GroupMappingEntity[] | []> => {
                const groupMapping = await groupMappingClient.findAll();
        
                return groupMapping;
    },
})

export const groupMappingAllAtom = atom<GroupMappingEntity[] | []>({
    key: 'groupMappingAllAtom',
    default: groupMappingSelector
})


