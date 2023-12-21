import {atom, atomFamily, selector, selectorFamily, useRecoilCallback, useRecoilValue, useSetRecoilState} from "recoil"
import GroupClient from "../../clients/group.client";
import {GroupEntity} from "../../clients/entities/group.entity";

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