import {Canvas} from "@react-three/fiber";
import Editor from "./Editor";
import selectedMeshStore from "../store/selected-mesh.store";
import {Html, KeyboardControls, Sky} from "@react-three/drei";
import {cameraFar, floorSize} from "../config";
import {TransformControlsProvider} from "../context/transform-controls.context";
import {RecoilRoot, useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import CanvasLoader from "./CanvasLoader";
import { Suspense } from "react";
import {ExhibitPlayer} from "./exhibit-player";
import {Physics} from "@react-three/rapier";
import {ExhibitGround} from "./exhibit-ground";
import { selectedGroupMappingAtom  } from "store/recoil/groups-mapping.recoil";


export default function ExhibitCanvas() {
    const [,set] = useRecoilState(selectGroupAtom);
    const [selectedGroupMapping] = useRecoilState(selectedGroupMappingAtom);
    return (
        <>
                    <Canvas
                        dpr={[1, 2]}
                        shadows 
                        camera={{ fov: 45, position: [15, 10, 0], near:0.1, far: cameraFar}}
                        onPointerMissed={(event:MouseEvent) => set(null)}
                    >

                        <Sky sunPosition={[100, 20, 100]} />
                        <ambientLight intensity={selectedGroupMapping.ambientLightIntensity} />
                        {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} /> */}
                        <Physics gravity={[0, -30, 0]}>
                            <Suspense fallback={<CanvasLoader />}>
                                <TransformControlsProvider>
                                    <Editor />
                                    <ExhibitGround
                                        position={[0,-6,0]}
                                        color={"white"}
                                    />
                                    <axesHelper args={[floorSize]} />
                                    <gridHelper args={[floorSize, floorSize]} />
                                </TransformControlsProvider>
                            </Suspense>
                        </Physics>
                    </Canvas>
        </>

    )
}