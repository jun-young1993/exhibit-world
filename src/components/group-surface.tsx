import {GroupEntity} from "../clients/entities/group.entity";
import {useState} from "react";
import Surface from "./surface";
import {useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import {ThreeEvent, useThree} from "@react-three/fiber";
import {Group, Mesh} from "three";

export interface GroupSurface {
    object: GroupEntity
}
export default function GroupSurface(props: GroupSurface){

    const group = props.object;
    const [meshes] = useState<GroupEntity['mesh']>(group.mesh);


    return (
        <group
            uuid={group.id}

        >
            {meshes.map((mesh) => {
                return <Surface object={mesh} key={mesh.id}/>
            })}

        </group>
    )
}