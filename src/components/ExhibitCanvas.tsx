import {Canvas} from "@react-three/fiber";
import Editor from "./Editor";
import selectedMeshStore from "../store/selected-mesh.store";
import {KeyboardControls, Sky} from "@react-three/drei";
import Player from "./Player";

export default function ExhibitCanvas() {
    const {target, setTarget} = selectedMeshStore();
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
                shadows camera={{ fov: 45, position: [0, 10, 0] }}
                onPointerMissed={() => setTarget(null)}
            >
                <Sky sunPosition={[100, 20, 100]} />
                {/*<Player />*/}
                <Editor />

            </Canvas>
        </KeyboardControls>
    )
}