import {atom, selector} from "recoil"
import GroupClient from "../../clients/group.client";
import {GroupEntity} from "../../clients/entities/group.entity";

const groupClient = new GroupClient();

export const groupsFindAllSelector = selector<GroupEntity[]>({
    key: 'groupsFindAllSelector',
    get: async (): Promise<GroupEntity[]> => {
        return await groupClient.findAll();
    },
    set: ({set, get}, setGroups) => {
        const currenGroups = get(groupsFindAllAtom);

        const groups = [...currenGroups, ...setGroups as GroupEntity[]];
        set(groupsFindAllAtom, groups)


    }
})

export const groupsFindAllAtom = atom<GroupEntity[]>({
    key: 'groupsFindAllAtom',
    default: groupsFindAllSelector
})



