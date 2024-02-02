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

const groupClient = new GroupClient();

export const groupsSelector = selector<GroupEntity[]>({
    key: 'groupsSelector',
    get: async (): Promise<GroupEntity[]> => {
            return await groupClient.findAll();
    },
})

export const groupsAllAtom = atom<GroupEntity[]>({
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

const groupSelector = selectorFamily<GroupEntity, GroupEntity['id']>({
    key: "groupSelector",
    get: (uuid) => async ({get}) => {
        const groups = get(groupsAllAtom);
        const groupEntity = groups.find((group) => group.id === uuid);

        if (groupEntity === undefined) {
            throw new Error(`Group with id ${uuid} not found`);
        }
        return groupEntity;
    }
})

export const groupAtom = atomFamily<GroupEntity, GroupEntity['id']>({
    key: 'groupAtom',
    default: groupSelector
})




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
            (groupEntity:GroupEntity) => {
                const group = snapshot.getLoadable(groupsAllAtom).getValue();
                set(groupsAllAtom, [...group,groupEntity]);
                addGroup(groupEntity.id);
            },
        [],
    )
}

export function useRemoveGroupHook(){
    const [,setSelectGroup] = useRecoilState(selectGroupAtom);

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

                set(groupsAllAtom,[...removedGroups]);
                removeGroupId(groupEntity.id);

            },
    []
    )
}

