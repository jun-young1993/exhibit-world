import {Canvas} from "@react-three/fiber";
import Editor from "./Editor";
import selectedMeshStore from "../store/selected-mesh.store";
import {Html, KeyboardControls, Sky} from "@react-three/drei";
import {cameraFar} from "../config";
import {TransformControlsProvider} from "../context/transform-controls.context";
import {RecoilRoot, useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";
import CanvasLoader from "./CanvasLoader";
import { Suspense } from "react";
import {ExhibitPlayer} from "./exhibit-player";
import {Physics} from "@react-three/rapier";


export default function ExhibitCanvas() {
    const [,set] = useRecoilState(selectGroupAtom);
    return (
        <>
                    <Canvas
                        dpr={[1, 2]}
                        shadows 
                        camera={{ fov: 45, position: [15, 10, 0], near:0.1, far: cameraFar}}
                        onPointerMissed={(event:MouseEvent) => set(null)}
                    >

                        <Sky sunPosition={[100, 20, 100]} />
                        <ambientLight intensity={0.3} />
                        {/* <pointLight castShadow intensity={0.8} position={[100, 100, 100]} /> */}

                            <Suspense fallback={<CanvasLoader />}>
                                <TransformControlsProvider>
                                    <Editor />
                                    <axesHelper args={[1000]} />
                                </TransformControlsProvider>
                            </Suspense>

                    </Canvas>
        </>

    )
}