import {OrbitControls, Html} from "@react-three/drei";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import GroupSurface from "./group-surface";
import { useRecoilValue } from "recoil";
import { groupIdsAtom } from "../store/recoil/groups.recoil";
import { ThreeEvent } from "@react-three/fiber";
import useSelectedGroupHook from "../store/recoil/select-group.recoil";
import useExportSync from "../hook/export-sync";

export default function Editor() {

    const groupIds = useRecoilValue(groupIdsAtom);
    const selected = useSelectedGroupHook();
    useExportSync();
    return (
        <>
            {groupIds.map((groupIds) => {

                return (
                    <GroupSurface key={groupIds} uuid={groupIds} selected={groupIds === selected?.uuid}/>
                )
            })}
            {
                (selected
                        ? <EditTransformControls object={selected}/>
                        : <></>
                )
            }

            <OrbitControls
                target={selected ? selected.position : undefined}
                makeDefault
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 1.75}
                onClick={() => {
                    console.log('obnCLick')
                }}
                onPointerDown={() => {
                    console.log('onPointer down');
                }}
                onPointerUp={(event: ThreeEvent<MouseEvent>) => {

                  console.log(event);
                }}
            />


        </>
    )
}