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

import { selectedGroupMappingIdAtom } from "./groups-mapping.recoil";
import { SpotLight } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { objectDefalutValues } from "config";
import { useToast } from "./toast.recoil";

const groupClient = new GroupClient();
const exporter = new GLTFExporter();
export const groupsSelector = selector<GroupEntity[] | []>({
    key: 'groupsSelector',
    get: async ({get}): Promise<GroupEntity[] | []> => {
                const selectedGroupMappingId = get(selectedGroupMappingIdAtom);
                if(selectedGroupMappingId === null){
                    return [];
                }
                const groups = await groupClient.findAll(selectedGroupMappingId);
                
                return groups;
    },
})

export const groupsAllAtom = atom<GroupEntity[] | []>({
    key: 'groupsAllAtom',
    default: groupsSelector
})

export const groupIdsSelector = selector<GroupEntity['id'][]>({
    key: "groupIdsSelector",
    get: ({get}) => {
        const groups = get(groupsAllAtom);
        return groups.map((group) => group.id);
    }
})

export const groupIdsAtom = atom<GroupEntity['id'][]>({
    key: 'groupIdsAtom',
    default: groupIdsSelector
})

const groupSelectorFamily = selectorFamily<GroupEntity, GroupEntity['id']>({
    key: "groupSelectorFamily",
    get: (uuid: GroupEntity['id']) => async ({get}) => {
        const groups = get(groupsAllAtom);
        const groupEntity = groups.find((group) => group.id === uuid);

        if (groupEntity === undefined) {
            throw new Error(`Group with uuid ${uuid} not found`);
        }
        return groupEntity;
    }
})

export const groupAtomFamily = atomFamily<GroupEntity, GroupEntity['id']>({
    key: 'groupAtomFamily',
    default: groupSelectorFamily
})


export function usePatchGroupHook(){
    return useRecoilCallback(
        ({snapshot, set}) =>
            (uuid: GroupEntity['id'], patchGroup: PatchGroupInterface) => {
                const groups = snapshot.getLoadable(groupsAllAtom).getValue();
                groupClient.patch(uuid,patchGroup)
                    .then((resultUpdate) => {
                        const patchGroupList = groups.map((group) => {
                            if(group.id === uuid){

                                const patchedGroup = { ...group, name: patchGroup.name };
                                return patchedGroup;
                            }
                            return group;
                        });
                        set(groupsAllAtom,[...patchGroupList]);

                    })
                    .catch((error) => {
                        console.log("=>(groups.recoil.ts:80) error", error);
                    })





            },
        []
    )
}

export function useAddGroupHook(){
    const addGroup = useRecoilCallback(
        ({ snapshot, set }) =>
            (uuid:GroupEntity['id']) => {
                const groupIds = snapshot.getLoadable(groupIdsAtom).getValue();
                set(groupIdsAtom, [...groupIds, uuid]);
            },
        [],
    );
    return useRecoilCallback(
        ({ snapshot, set }) =>
            (files: File[]) => {

                const selectedGroupMappingId = snapshot.getLoadable(selectedGroupMappingIdAtom).getValue();

                files.forEach((file) => {
                        groupClient
                            .create(selectedGroupMappingId,file)
                            .then((groupEntity) => {
                                const group = snapshot.getLoadable(groupsAllAtom).getValue();
                                set(groupsAllAtom, [...group,groupEntity]);
                                addGroup(groupEntity.id);
                            })
                })

            },
        [],
    )
}

export function useAddSpotLightGroupHook(){
    const addGroup = useAddGroupHook();
    return useRecoilCallback(
        () =>
            () => {
                const spotLight = new SpotLight("0xffffff");
                
                
                spotLight.userData = objectDefalutValues.spotLight;
                exporter.parse(
                    spotLight,
                    (gltf) => {
        
                        const blob  = new Blob([gltf as ArrayBuffer],{ type: "application/octet-stream" });
                        const file = new File([blob],spotLight.uuid ,{ type: "application/octet-stream" });
                        const fileList = [file];
                        addGroup(fileList);
                    },
                    (error) => {
                        console.log('error',error);
                    },
                    {
                        binary: true
                    }
                );
            }
    )
 
}

export function useRemoveGroupHook(){
    const [,setSelectGroup] = useRecoilState(selectGroupAtom);
    const {pushToast} = useToast();
    const removeGroupId = useRecoilCallback(
        ({snapshot, set}) =>
            (uuid: GroupEntity['id']) => {
                const groupIds = snapshot.getLoadable(groupIdsAtom).getValue();
                const removedGroupIds = groupIds.filter(group => group !== uuid);
                setSelectGroup(null);
                set(groupIdsAtom,[...removedGroupIds]);
            }
    )

    return useRecoilCallback(
        ({snapshot, set}) =>
            (groupEntity: GroupEntity) => {
                const groups = snapshot.getLoadable(groupsAllAtom).getValue();
                const removedGroups = groups.filter((group) => group.id !== groupEntity.id);
                groupClient.remove(groupEntity.id)
                .then((groupEntity) => {
                    set(groupsAllAtom,[...removedGroups]);
                    removeGroupId(groupEntity.id);
                    pushToast({
                        content: "An object has been deleted."
                    })
                })
                .catch((error) => {
                    pushToast({
                        content: error.toString()
                    })
                })
                

            },
    []
    )
}

