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
import {isEmpty} from "lodash";
import {CreateGroupMappingDtoInterface} from "../../clients/dto/group-mapping/create-group-mapping.dto";

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

export const selectedGroupMappingSelector = selector<string | null>({
    key: 'selectedGroupMappingSelector',
    get: ({get}) => {
        const groupMapping = get(groupMappingAllAtom);
        if(isEmpty(groupMapping)){
            return null;
        }

        return groupMapping[0].id;
    }
})

export const selectedGroupMappingAtom = atom<string | null>({
    key: 'selectedGroupMappingAtom',
    default: selectedGroupMappingSelector
})

export function useAddGroupMappingHook(){
    return useRecoilCallback(
        ({snapshot, set}) =>
            (createGroupMappingDto: CreateGroupMappingDtoInterface) => {
                const groupMappingList = snapshot.getLoadable(groupMappingAllAtom).getValue();
                groupMappingClient.create(createGroupMappingDto)
                    .then((groupMapping) => {
                        set(groupMappingAllAtom,[...groupMappingList,groupMapping])
                    })
                    .catch((error) => {
                        console.log("=>(groups-mapping.recoil.ts:64) error", error);
                    });
                // set(groupMappingAllAtom,)
            }
    )
}


