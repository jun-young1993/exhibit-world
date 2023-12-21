import {GroupEntity} from "../clients/entities/group.entity";
import {useState} from "react";
import Surface from "./surface";
import {useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import {ThreeEvent, useThree} from "@react-three/fiber";
import {Group, Mesh} from "three";
import GroupFactory from "../clients/factories/group.factory";
import {groupAtom} from "../store/recoil/groups.recoil";


export interface GroupSurface {
    // object: GroupEntity
    uuid: GroupEntity['id']
}
export default function GroupSurface(props: GroupSurface){
    const [group, setGroup] = useRecoilState(groupAtom(props.uuid));
    const [, select] = useRecoilState(selectGroupAtom);
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        select(group.id);
    }
    const groupFactory = new GroupFactory(group).get();
    const meshes = group.mesh;
    return (
        <group
            onPointerUp={handleClick}
            {...groupFactory}

        >
            {meshes.map((mesh) => {
                return <Surface object={mesh} key={mesh.id}/>
            })}

        </group>
    )
}