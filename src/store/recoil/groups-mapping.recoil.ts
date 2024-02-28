import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
    useRecoilCallback,
    useRecoilState,
} from "recoil"
import GroupMappingClient from "clients/group-mapping.client";
import { GroupMappingEntity } from "clients/entities/group-mapping.entity";
import {isEmpty} from "lodash";
import {CreateGroupMappingDtoInterface} from "../../clients/dto/group-mapping/create-group-mapping.dto";
import {
    PatchGroupMappingDtoInterface
} from "../../clients/dto/group-mapping/patch-group-mapping.dto";

const groupMappingClient = new GroupMappingClient();

export const groupMappingSelector = selector<GroupMappingEntity[] | []>({
    key: 'groupMappingSelector',
    get: async (): Promise<GroupMappingEntity[] | []> => {
        try{
            const groupMapping = await groupMappingClient.findAll();
        
            return groupMapping;
        }catch(error){
            throw error;
        }
                
    },
})

export const groupMappingAllAtom = atom<GroupMappingEntity[] | []>({
    key: 'groupMappingAllAtom',
    default: groupMappingSelector
})

export const selectedGroupMappingIdSelector = selector<string>({
    key: 'selectedGroupMappingIdSelector',
    get: ({get}) => {
        const groupMapping = get(groupMappingAllAtom);
        if(isEmpty(groupMapping)){
            throw new Error('The group mapping data is empty.')
        }

        return groupMapping[0].id;
    }
})

export const selectedGroupMappingIdAtom = atom<string>({
    key: 'selectedGroupMappingIdAtom',
    default: selectedGroupMappingIdSelector
})

export const selectedGroupMappingSelector = selector<GroupMappingEntity>({
    key: 'selectedGroupMappingSelector',
    get: ({get}) => {
        // const groupMapping = get(groupMappingAllAtom);
        const selectedGroupMappingId = get(selectedGroupMappingIdAtom);
        const groupMappingEntity = get(groupMappingAtomFamily(selectedGroupMappingId));
        // const groupMappingEntity = groupMapping.find((mapping) => mapping.id === selectedGroupMappingId);
        if(groupMappingEntity === undefined){
            throw new Error(`Group Mapping with uuid ${selectedGroupMappingId} not found`);
        }
        return groupMappingEntity;
    }
});

export const selectedGroupMappingAtom = atom<GroupMappingEntity>({
    key: 'selectedGroupMappingAtom',
    default: selectedGroupMappingSelector
});

export const groupMappingSelectorFamily = selectorFamily<GroupMappingEntity, GroupMappingEntity['id']>({
    key: 'groupMappingSelector',
    get: (uuid: GroupMappingEntity['id']) => ({get}) =>  {
        const groupMapping = get(groupMappingAllAtom);
        const groupMappingEntity = groupMapping.find((mapping) => mapping.id === uuid);
        if(isEmpty(groupMappingEntity)){
            throw new Error(`Group Mapping with uuid ${uuid} not found`);
        }
        return groupMappingEntity;
    }
})

export const groupMappingAtomFamily = atomFamily<GroupMappingEntity, GroupMappingEntity['id']>({
    key: 'groupMappingAtomFamily',
    default: groupMappingSelectorFamily
});

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

export function usePatchGroupMappingHook(){
    return useRecoilCallback(
        ({snapshot, set}) =>
            (uuid: GroupMappingEntity['id'], patchGroupMapping: PatchGroupMappingDtoInterface) => {
                const groupMapping = snapshot.getLoadable(groupMappingAllAtom).getValue();
                groupMappingClient.patch(uuid, patchGroupMapping)
                    .then((resultUpdate) => {
                        const patchGroupMappingList = groupMapping.map((mapping) => {
                            if(mapping.id === uuid){
                                const patchedGroupMapping: GroupMappingEntity = {
                                    ...mapping,
                                    name: patchGroupMapping.name ?? mapping.name,
                                    ambientLightIntensity: patchGroupMapping.ambientLightIntensity ?? mapping.ambientLightIntensity
                                }
                                return patchedGroupMapping;
                            }
                            return mapping;
                        })

                        set(groupMappingAllAtom,[...patchGroupMappingList]);
                    })
                    .catch((error) => {
                        console.log("=>(groups-mapping.recoil.ts:103) error");
                    })
            }
    )
}

export function useDeleteGroupMappingHook(){
    
    return useRecoilCallback(
        ({snapshot, set}) => 
            (uuid: GroupMappingEntity['id']) => {
                const groupMapping = snapshot.getLoadable(groupMappingAllAtom).getValue();
                const removeGroupMapping = groupMapping.filter((mapping) => mapping.id !== uuid);
                groupMappingClient.delete(uuid)
                .then((result) => {
                    set(groupMappingAllAtom,[...removeGroupMapping]);
                })
            }
    )
}

