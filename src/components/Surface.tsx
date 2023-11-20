import {MeshProps, ThreeEvent} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {Color, Mesh} from "three";
import {useCallback, useEffect, useMemo, useRef} from "react";
import MaterialControls from "../lib/edit-controls/material.controls";
import GeometryControls from "../lib/edit-controls/geometry.controls";




interface SurfaceProps extends MeshProps {
    onSelected?: (mesh: Mesh) => void
    clicked?: boolean
}

export default function Surface(props: SurfaceProps) {
    const meshRef = useRef<Mesh>(null!);
    // const setSelectedMesh = selectedMeshStore((state) => state.setTarget);
    const {target, setTarget} = selectedMeshStore();


    const handleClick = useCallback((e:  ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            setTarget(e.object as Mesh);
    },[setTarget])

    useEffect(() => {
        if(meshRef){
            setTarget(meshRef.current as Mesh);
        }
    },[props.clicked, meshRef])




    return (
        <mesh
            {...props}
            ref={meshRef}
            onClick={handleClick}
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