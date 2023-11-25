import {MeshProps, ThreeEvent} from "@react-three/fiber";
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

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
    meshRef?: Mesh
}

export default function Surface(props: SurfaceProps) {
    const meshRef = useRef<Mesh>(null!) ;

    const {target, setTarget} = selectedMeshStore();
    const [showContext, setShowContext] = useState<boolean>(false);

    const handleClick = useCallback((e:  ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            if(isCurrentTarget(e.object.uuid)){
                setTarget(e.object as Mesh);
            }

    },[setTarget])
    const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
        e.nativeEvent.preventDefault();
        setShowContext(!showContext);
    };
    const isCurrentTarget = (uuid?: string) => {
        return (uuid ?? target?.uuid) === props.uuid ? true : false;
    }

    useEffect(() => {
        if(target === null && showContext === true){
            setShowContext(false);
        }
    },[target, showContext])

    useEffect(() => {
        if(meshRef){

            // setTarget(meshRef.current as Mesh);
        }
    },[meshRef])





    return (
        <mesh
            {...props}
            ref={meshRef}
            onClick={handleClick}
            onContextMenu={handleContextMenu}

        >
            {/*<boxGeometry />*/}
            {/*<meshBasicMaterial />*/}
            {(target && isCurrentTarget()) && (
                <>
                    <GeometryControls mesh={target}/>
                    <MaterialControls mesh={target}/>
                </>
            )}
            <Html>
                {(target && isCurrentTarget() && showContext) && (
                        <>
                            <EditContextMenuControls
                                mesh={target}
                            />
                        </>
                )}
            </Html>
        </mesh>
    )
}


