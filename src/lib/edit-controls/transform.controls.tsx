import {forwardRef, Ref, useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {TransformControl} from "../../types/transform";
import {useTransformControls} from "../../context/transform-controls.context";
;


const EditTransformControls = forwardRef((props: TransformControlsProps, ref: Ref<TransformControl> | undefined) => {

    const transformControls = useTransformControls();



    return <>
        <TransformControls
            ref={transformControls}
            {...props}
        />
    </>;

})

export default EditTransformControls;