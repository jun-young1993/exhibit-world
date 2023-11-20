import {MeshProps} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {Color, Mesh} from "three";
import {useEffect, useMemo, useRef} from "react";
import MaterialControls from "../lib/edit-controls/material.controls";
import GeometryControls from "../lib/edit-controls/geometry.controls";




interface SurfaceProps extends MeshProps {
    onSelected?: (mesh: Mesh) => void
}

export default function Surface(props: SurfaceProps) {
    const meshRef = useRef<Mesh>(null!);
    // const setSelectedMesh = selectedMeshStore((state) => state.setTarget);
    const {target, setTarget} = selectedMeshStore();









    return (
        <mesh
            {...props}
            ref={meshRef}
            onClick={
                (e) => {
                    setTarget(e.object as Mesh)
                }
            }
        >
            <boxGeometry />
            <meshBasicMaterial />
            {target &&
                <>
                    <GeometryControls mesh={target}/>
                    <MaterialControls mesh={target}/>

                </>
            }
        </mesh>
    )
}