import Surface from "./Surface";
import selectedMeshStore from "../store/selected-mesh.store";
import {OrbitControls, TransformControls, Stats} from "@react-three/drei";
import EditTransformControls from "../lib/edit-controls/transform.controls";
import GeometryControls from "../lib/edit-controls/geometry.controls";
import MeshesStore from "../store/meshes.store";
import buttonControls from "../lib/edit-controls/button.controls";
import ButtonControls from "../lib/edit-controls/button.controls";
import {Fragment} from "react";





export default function Editor() {
    const { target } = selectedMeshStore();
    const { meshes, setMesh } = MeshesStore();






    return (
        <>
            {meshes.map((mesh, index) => (
                <Fragment key={index}>
                    {mesh}
                </Fragment>
            ))}
            {target
                ? <EditTransformControls mesh={target} />
                :
                <>
                    <ButtonControls

                    />
                    <OrbitControls/>
                </>

            }

            <gridHelper args={[2000, 2000]}/>
            {/*<Stats />*/}

        </>
    )
}