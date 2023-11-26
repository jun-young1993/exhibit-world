import {MeshProps, ThreeEvent, useThree} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import { Mesh } from "three";
import {
    Component,
    createRef, MutableRefObject,
    RefObject, useCallback, useEffect, useRef, useState,
} from "react";
import MaterialControls from "../lib/edit-controls/material.controls";
import GeometryControls from "../lib/edit-controls/geometry.controls";
import {Html} from "@react-three/drei";
import EditContextMenuControls from "../lib/edit-controls/context-menu.controls";
import MeshClient from "../clients/mesh.client";
import ExhibitMeshEntity from "../clients/entities/exhibit-mesh.entity";
import MeshesStore from "../store/meshes.store";
import meshesStore from "../store/meshes.store";

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
}

export default function Surface(props: SurfaceProps) {


    const { selected , select } = selectedMeshStore();
    const { scene } = useThree();

    const [showContext, setShowContext] = useState<boolean>(false);


    const handleClick = useCallback((e:  ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            if(isCurrentTarget(e.object.uuid)){
                select(scene.getObjectByProperty('uuid',e.object.uuid) as Mesh | undefined);
            }
    },[select])
    const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
        e.nativeEvent.preventDefault();
        setShowContext(!showContext);
    };
    const isCurrentTarget = (uuid?: string) => {
        return (uuid ?? selected?.uuid) === props.uuid ? true : false;
    }

    useEffect(() => {
        if( selected && showContext === true ){
            setShowContext(false);
        }
    },[selected, showContext])







    return (
        <mesh
            {...props}
            onClick={handleClick}
            onContextMenu={handleContextMenu}

        >
            <boxGeometry />
            <meshBasicMaterial />
            {(selected && isCurrentTarget()) && (
                <>
                    <GeometryControls mesh={selected}/>
                    <MaterialControls mesh={selected}/>
                </>
            )}
            <Html>
                {(selected && isCurrentTarget() && showContext) && (
                        <>
                            <EditContextMenuControls
                                mesh={selected}
                            />
                        </>
                )}
            </Html>
        </mesh>
    )
}


