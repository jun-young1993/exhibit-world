import {MeshProps, ThreeEvent, useThree} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {Group, Mesh} from "three";
import {
    useCallback, useEffect, useRef, useState,
} from "react";
import meshSelectedOnPointerEventEmitter from "../events/mesh-selected.event";
import PreloadGltf from "../utills/preload-gltf";
import {ThemeProvider} from "@material-tailwind/react";
import {Html} from "@react-three/drei";

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
    userData: {[key: string]: any}
    isGroup?: boolean
}

export default function Surface(props: SurfaceProps) {

    const { selected , select } = selectedMeshStore();
    const [material , setMaterial] = useState(props.material);
    const [geometry, setGeometry] = useState(props.geometry);
    const { scene } = useThree();
    const [group, setGroup] = useState<Group|null>(null);
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

    useEffect(() => {
        PreloadGltf(props,(glb, mesh) => {

            setMaterial(mesh.material);
            setGeometry(mesh.geometry);
        });
    },[]);


    return (
        <>
            <mesh
                {...props}
                onClick={handleClick}
                onContextMenu={handleContextMenu}
                material={material}
                geometry={geometry}
                onPointerUp={(e) => {
                    console.log('e',e);
                    if(isCurrentTarget()){
                        meshSelectedOnPointerEventEmitter.emit(`${selected?.uuid}`, selected);
                    }
                }}
            >
                <Html
                    position={[2, 0, 2]}
                    zIndexRange={[90000002,90000003]}
                >
                    {isCurrentTarget() &&
                    <div onClick={(event) => {
                        event.stopPropagation();
                        console.log('hi')
                    }}>
                        <h1>hihi</h1>
                    </div>
                    }
                </Html>
            </mesh>

        </>
    )
}


