import {useControls} from "leva";
import {useMemo} from "react";
import {Mesh} from "three";
import {TransformControls} from "@react-three/drei";
import {EditControlsInterface} from "./edit.controls";
import {controlsOrder} from "../../config";
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

export default function EditTransformControls({mesh}: EditTransformControls)
{
    const controlName = 'Transform';
    const options = useMemo(() => {
        return EditTransformControlsOptions();
    },[]);
    const {mode} = useControls(controlName,options);
    return <><TransformControls object={mesh} mode={mode} /></>;

}