import ExhibitClient from "../../clients/exhibit.client";
import {atom, atomFamily, selector, selectorFamily, useRecoilCallback} from "recoil";
import {ExhibitEntity} from "../../clients/entities/exhibit.entity";
import {useToast} from "./toast.recoil";
import {IconType} from "../../components/toast/exhibit-toast";
import {PatchExhibitDtoInterface} from "../../clients/dto/exhibit/patch-exhibit.dto";

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

export const exhibitSelectorFamily = selectorFamily<ExhibitEntity, ExhibitEntity['id']>({
    key: "exhibitSelectorFamily",
    get: (uuid: ExhibitEntity['id']) => ({get}) => {
        const exhibits = get(exhibitAllAtom);
        const exhibitEntity = exhibits.find((exhibit) => exhibit.id === uuid);
        if(exhibitEntity === undefined){
            throw new Error(`Exhibit with uuid ${uuid} not found`);
        }

        return exhibitEntity;
    }
})

export const exhibitAtomFamily = atomFamily<ExhibitEntity, ExhibitEntity['id']>({
    key: "exhibitAtomFamily",
    default: exhibitSelectorFamily
})

export function useRemoveExhibitHook() {
    const {pushToast} = useToast();
    return useRecoilCallback(
        ({snapshot, set}) =>
                (exhibitEntity: ExhibitEntity) => {
                    const exhibits = snapshot.getLoadable(exhibitAllAtom).getValue();
                    const removedExhibits = exhibits.filter((exhibit) => {
                        return exhibit.id !== exhibitEntity.id
                    });
                    exhibitClient.delete(exhibitEntity.id)
                        .then((deletedExhibit) => {
                            set(exhibitAllAtom,[...removedExhibits]);
                            pushToast({
                                content: `An exhibit has been deleted (${exhibitEntity.name})`
                            })
                        })
                        .catch((exception ) => {
                            pushToast({
                                icon: IconType.FAIL,
                                content: `${exception.toString()}`
                            })
                        })

                },
        []
        )
}


export function usePatchExhibitHook(){
    const { pushToast } = useToast();
    return useRecoilCallback(
        ({snapshot, set}) =>
            (uuid: ExhibitEntity['id'], patchExhibit: PatchExhibitDtoInterface) => {
                const exhibits = snapshot.getLoadable(exhibitAllAtom).getValue();
                exhibitClient.patch(uuid, patchExhibit)
                    .then((updateResult) => {
                        const patchedExhibits = exhibits.map((exhibit) => {
                            if(exhibit.id === uuid){
                                const patchedExhibit: ExhibitEntity = {
                                    ...exhibit,
                                    name: patchExhibit.name ?? exhibit.name
                                }
                                return patchedExhibit;
                            }
                            return exhibit;
                        });
                        pushToast({
                            content: `An exhibit has been modified (${patchExhibit.name})`
                        })
                        set(exhibitAllAtom,[...patchedExhibits]);

                    })
                    .catch((exception) => {
                        pushToast({
                            icon: IconType.FAIL,
                            content: `${exception.toString()}`
                        })
                    })

            }
    )
}

