import {useControls} from "leva";

enum TransformControlsMode {
    Translate = 'translate',
    Rotate = 'rotate',
    Scale = 'scale'
}


export default function useTransformControls()
{
    const controlName = 'transform';
    return useControls(controlName,{
        mode: {
            value: TransformControlsMode.Translate,
            options: Object.values(TransformControlsMode)
        }
    })
}