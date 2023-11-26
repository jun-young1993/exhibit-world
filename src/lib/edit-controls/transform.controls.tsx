import {useControls} from "leva";
import {useMemo, useRef} from "react";
import {Mesh, Object3D} from "three";
import {TransformControls} from "@react-three/drei";
import {EditControlsInterface} from "./edit.controls";
import {useFrame, useThree} from "@react-three/fiber";
import selectedMeshStore from "../../store/selected-mesh.store";
enum TransformControlsMode {
    Translate = 'translate',
    Rotate = 'rotate',
    Scale = 'scale'
}
interface EditTransformControls extends EditControlsInterface {

}

export function EditTransformControlsOptions() {
    return {
        mode: {
            value: TransformControlsMode.Translate,
            options: Object.values(TransformControlsMode)
        }
    }

}

export default function EditTransformControls()
{
    const { selected } = selectedMeshStore();

    // console.log("=>(transform.controls.tsx:32) selected instanceof Object3D", selected instanceof Object3D);


    const controlName = 'Transform';
    const options = useMemo(() => {
        return EditTransformControlsOptions();
    },[]);
    const {mode} = useControls(controlName,options);
    console.log("=>(transform.controls.tsx:38) selected", selected);
    if(selected){
        console.log("=>(transform.controls.tsx:39) selected.clone()", selected.clone());
    }

    return <>
        <TransformControls object={selected} mode={mode} />
    </>;

}