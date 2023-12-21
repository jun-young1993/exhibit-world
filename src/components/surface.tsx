import {GroupEntity} from "../clients/entities/group.entity";
import MeshEntity from "../clients/entities/mesh.entity";
import {useState} from "react";
import {Group, Mesh, Object3D, Vector3} from "three";
import {Quaternion} from "three/src/math/Quaternion";
import {Euler} from "three/src/math/Euler";
import GeometryFactory from "../clients/factories/geometry.factory";
import MaterialFactory from "../clients/factories/material.factory";
import MeshFactory from "../clients/factories/mesh.factory";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import {ThreeEvent, useThree} from "@react-three/fiber";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import {TransformControls} from "@react-three/drei";

export interface SurfaceProps {
    object: MeshEntity
}

export default function Surface(props: SurfaceProps) {
    const mesh = props.object;
    const meshFactory = new MeshFactory(mesh).get();

    const { scene } = useThree();
    // const [, select] = useRecoilState(selectGroupAtom);

    // const handleClick = (event: ThreeEvent<MouseEvent>) => {
    //     event.stopPropagation();
    //     select(meshFactory.uuid);
    // }

    return (
        <mesh
            {...meshFactory}
            // onClick={handleClick}
        >

        </mesh>
    )
}