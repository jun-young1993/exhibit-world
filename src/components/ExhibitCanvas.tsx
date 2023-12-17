import {Canvas} from "@react-three/fiber";
import Editor from "./Editor";
import selectedMeshStore from "../store/selected-mesh.store";
import {Html, KeyboardControls, Sky} from "@react-three/drei";
import {cameraFar} from "../config";
import {TransformControlsProvider} from "../context/transform-controls.context";
import {RecoilRoot, useRecoilState} from "recoil";
import {selectGroupAtom} from "../store/recoil/select-group.recoil";


export default function ExhibitCanvas() {
    const [,set] = useRecoilState(selectGroupAtom);
    return (
        <>
                <KeyboardControls map={[
                    { name: "forward", keys: ["ArrowUp", "w", "W"] },
                    { name: "backward", keys: ["ArrowDown", "s", "S"] },
                    { name: "left", keys: ["ArrowLeft", "a", "A"] },
                    { name: "right", keys: ["ArrowRight", "d", "D"] },
                    { name: "jump", keys: ["Space"] },
                ]}>
                    <Canvas
                        dpr={[1, 2]}
                        shadows camera={{ fov: 45, position: [15, 10, 0], near:0.1, far: cameraFar}}
                        onPointerMissed={(event:MouseEvent) => set(null)}
                    >

                        <Sky sunPosition={[100, 20, 100]} />
                    {/*        /!*<Player />*!/*/}
                        <ambientLight intensity={5} />
                            <TransformControlsProvider>
                                <Editor />
                            </TransformControlsProvider>
                    </Canvas>
                </KeyboardControls>
        </>

    )
}