import Surface from "./Surface";
import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, TransformControls, Stats} from "@react-three/drei";
import useTransformControls from "../lib/edit-controls/transform.controls";




export default function Editor() {
    const { target } = selectedMeshStore();
    const { mode } = useTransformControls();





    return (
        <>
            <Surface

            />
            {target
                ? <TransformControls object={target} mode={mode} />
                : <OrbitControls/>
            }

            <gridHelper args={[2000, 2000]}/>
            <Stats />

        </>
    )
}