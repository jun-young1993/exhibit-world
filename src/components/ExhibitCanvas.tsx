import {Canvas} from "@react-three/fiber";
import Editor from "./Editor";
import selectedMeshStore from "../store/selected-mesh.store";
import {KeyboardControls, Sky} from "@react-three/drei";
import Player from "./Player";
import {cameraFar} from "../config";

export default function ExhibitCanvas() {
    const {select} = selectedMeshStore();
    return (
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
                onPointerMissed={() => select(undefined)}
            >
                {/*<Sky sunPosition={[100, 20, 100]} />*/}
                {/*<Player />*/}
                <Editor />

            </Canvas>
        </KeyboardControls>
    )
}