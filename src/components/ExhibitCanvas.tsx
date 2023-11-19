import {Canvas} from "@react-three/fiber";
import Editor from "./Editor";
import selectedMeshStore from "../store/selected-mesh.store";

export default function ExhibitCanvas() {
    const {target, setTarget} = selectedMeshStore();
    return (
        <Canvas
            dpr={[1, 2]}
            onPointerMissed={() => setTarget(null)}
        >
            <Editor />
        </Canvas>
    )
}