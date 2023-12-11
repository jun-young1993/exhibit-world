import {MeshProps, ThreeEvent, useThree} from "@react-three/fiber";
import selectedMeshStore from "../store/selected-mesh.store";
import {FrontSide, Group, Mesh, NearestFilter, TextureLoader} from "three";
import {useCallback, useEffect, useState,} from "react";
import meshSelectedOnPointerEventEmitter from "../events/mesh-selected.event";
import PreloadGltf from "../utills/preload-gltf";
import {Html} from "@react-three/drei";
import {GrDocumentImage} from "react-icons/gr";
import IconButton, {IconButtonType} from "./icon-button";
import ImageClient from "../clients/image.client";
import {getSingleMaterial} from "../utills/mesh-info.utills";

export interface SurfaceProps extends MeshProps{
    onSelected?: (mesh: Mesh) => void
    select?: boolean
    userData: {[key: string]: any}
    isGroup?: boolean
}
const imageClient = new ImageClient()
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

    if(isCurrentTarget()){


        const texture = new TextureLoader().load(imageClient.getImageFileUrl("78699463-1e70-43e3-a60a-c434c897b286"));
        if (selected instanceof Mesh) {
            texture.wrapS = 1001;
            texture.wrapT = 1001;
            texture.magFilter = NearestFilter;

            const material = getSingleMaterial(selected)
            const cloneMaterail = material.clone();

            //@ts-ignore
            material.map = texture;

            const materials = [
                material,
                cloneMaterail,

            ];
            selected.material = materials;

            console.log(selected);
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


