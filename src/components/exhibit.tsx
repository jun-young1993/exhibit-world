import {useParams} from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import {ReactNode, Suspense, useEffect, useMemo, useState} from "react";
import CanvasLoader from "./CanvasLoader";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {KeyboardControls, KeyboardControlsEntry, OrbitControls, Sky} from "@react-three/drei";
import ExhibitClient from "../clients/exhibit.client";
import {isEmpty} from "lodash";
import {Physics} from "@react-three/rapier";
import {KeyboardControlsMap} from "../types/keyboard-controls-map";
import {ExhibitPlayer} from "./exhibit-player";
import {ExhibitGround} from "./exhibit-ground";
import Primitive from "./primitive";
import {ExhibitModal} from "./exhibit-modal";
import {useModal} from "../store/recoil/modal.recoild";
const exhibitClient = new ExhibitClient();
const gltfLoader = new GLTFLoader();
export interface ExhibitProps {
    uuid?: string
}

function ModalDisableContent(){
    return <>
        <span>비활성화된 콘텐츠 입니다.</span>
    </>
}

export default function Exhibit(props: ExhibitProps) {
    
    let { uuid }= useParams();
    if(isEmpty(uuid)){
        if(props.uuid){
            uuid = props.uuid;
        }else{
            throw new Error('not found exhibit uuid');
        }
    }


    const [object, setObject] = useState<GLTF | null>(null)
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const {openModal} = useModal();
    useEffect(() => {
        if (typeof uuid === "string") {
            exhibitClient.findOne(uuid)
                .then((exhibit) => {
                    if(exhibit.isPublic){
                        gltfLoader.load(exhibit.download_url,(gltf) => {
                            console.log("=>(exhibit.tsx:46) gltf", gltf);
                            setObject(gltf);
                        })
                    }else{
                        setIsPublic(exhibit.isPublic);
                        openModal({
                            content: <ModalDisableContent />
                        })
                    }

                })

        }
    },[])

    

    const map = useMemo<KeyboardControlsEntry<KeyboardControlsMap>[]>(()=>[
        { name: KeyboardControlsMap.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: KeyboardControlsMap.backward, keys: ['ArrowDown', 'KeyS'] },
        { name: KeyboardControlsMap.leftward, keys: ['ArrowLeft', 'KeyA'] },
        { name: KeyboardControlsMap.rightward, keys: ['ArrowRight', 'KeyD'] },
        { name: KeyboardControlsMap.jump, keys: ['Space'] },
        { name: KeyboardControlsMap.run, keys: ['Shift'] },
    ], [])
    return <>
        <KeyboardControls
                map={map}
            >
                <Canvas
                    dpr={[1, 2]}
                    shadows camera={{ fov: 45 }}
                >
                    <Sky sunPosition={[100, 20, 100]} />
                    <ambientLight intensity={0.3} />
                    {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} /> */}
                    <Physics gravity={[0, -30, 0]}>
                        <Suspense fallback={<CanvasLoader />}>


                            {object &&
                                <Primitive object={object.scene} />
                            }
                            <ExhibitGround />
                            <ExhibitPlayer />
                        </Suspense>
                    </Physics>
                </Canvas>
            </KeyboardControls>
        {isEmpty(props.uuid)
        ? <ExhibitModal />
        : null}

    </>
}