import {button, useControls} from "leva";
import MeshesStore from "../../store/meshes.store";
import Surface from "../../components/Surface";
import {ReactNode} from "react";
import selectedMeshStore from "../../store/selected-mesh.store";
import {Mesh} from "three";
export interface ButtonControlsOptionsEvents {
    setMesh: (mesh: ReactNode) => void

}
export function ButtonControlsOptions(props: ButtonControlsOptionsEvents){

    return {
        add: button((get) => {
            const mesh = <Surface />;
            props.setMesh(mesh);

        }),
    }
}
export default function ButtonControls(){
    const { meshes, setMesh } = MeshesStore();

    useControls(() => {
        return ButtonControlsOptions({
            setMesh,

        });
    })
    return <></>
}