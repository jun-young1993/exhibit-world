import ExhibitClient from "../../clients/exhibit.client";
import {atom, selector, useRecoilCallback} from "recoil";
import {ExhibitEntity} from "../../clients/entities/exhibit.entity";

const exhibitClient = new ExhibitClient();

export const exhibitSelector = selector<ExhibitEntity[] | []>({
   key: "exhibitSelector",
   get: async (): Promise<ExhibitEntity[] | []> => {
       return await exhibitClient.findAll();
   }
});

export const exhibitAllAtom = atom<ExhibitEntity[] | []>({
    key: "exhibitAllAtom",
    default: exhibitSelector
});

export function useRemoveExhibitHook() {
    return useRecoilCallback(
        ({snapshot, set}) =>
                (exhibitEntity: ExhibitEntity) => {
                    const exhibits = snapshot.getLoadable(exhibitAllAtom).getValue();
                    const removedExhibits = exhibits.filter((exhibit) => {
                        return exhibit.id !== exhibitEntity.id
                    });
                    set(exhibitAllAtom,[...removedExhibits]);
                },
        []
        )

}

