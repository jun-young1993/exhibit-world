import {MeshProps, ThreeEvent, useThree} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {BackSide, BoxGeometry, FrontSide, Group, Mesh, MeshBasicMaterial, NearestFilter, TextureLoader} from "three";
import {useCallback, useEffect, useState,} from "react";
import meshSelectedOnPointerEventEmitter from "../events/mesh-selected.event";
import PreloadGltf from "../utills/preload-gltf";
import {Html} from "@react-three/drei";
import {GrDocumentImage} from "react-icons/gr";
import IconButton, {IconButtonType} from "./icon-button";
import ImageClient from "../clients/image.client";
import {getJsonFromGeometry, getSingleMaterial} from "../utills/mesh-info.utills";

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
    userData: {[key: string]: any}
    isGroup?: boolean
}
const imageClient = new ImageClient()
export default function Surface_backup(props: SurfaceProps) {

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

    if(isCurrentTarget()){


        const texture = new TextureLoader().load("http://158.180.82.177/api/v1/images/file/ae7fa7f8-d0e9-473c-b443-afac1c872951");

        if (selected instanceof Mesh) {
            texture.wrapS = 1001;
            texture.wrapT = 1001;
            texture.magFilter = NearestFilter;

            // const cloneMesh = selected.clone()

            const leftMaterial = new MeshBasicMaterial({map: texture});
            const rightMaterial = new MeshBasicMaterial({map: texture});
            const topMaterial = new MeshBasicMaterial();
            const bottomMaterial = new MeshBasicMaterial();
            const frontMaterial = new MeshBasicMaterial();
            const backMaterial = new MeshBasicMaterial();
            const materials = [
                leftMaterial,
                rightMaterial,
                topMaterial,
                bottomMaterial,
                frontMaterial,
                backMaterial
            ];
            const cloneGeometry =  selected.geometry.clone();
            const {width, height, depth} = getJsonFromGeometry(selected);
            cloneGeometry.uuid = 'test';
            console.log(width, height, depth);
            const cloneMesh = new Mesh(
                new BoxGeometry(width, height, depth),
                materials
            );
            cloneMesh.position.copy(selected.position);
            // cloneMesh.scale.copy(selected.scale);
            cloneMesh.rotation.copy(selected.rotation);
            cloneMesh.quaternion.copy(selected.quaternion);

            scene.add(cloneMesh);

        }
    }
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
                    }}>
                        <IconButton
                            icon={<GrDocumentImage />}
                            type={IconButtonType.FILE}
                            description={"front texture image upload"}
                            onChangeFile={(event) => {
                                if(event.target.files instanceof FileList){
                                    // console.log(selected);
                                    // console.log(event.target.files[0]);
                                }
                            }}
                        />
                    </div>
                    }
                </Html>
            </mesh>

        </>
    )
}


