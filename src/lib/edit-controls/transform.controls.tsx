import {forwardRef, Ref, useEffect, useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {useTransformControls} from "../../context/transform-controls.context";
import {TransformControl} from "../../types/transform";



const EditTransformControls = forwardRef((props: TransformControlsProps, ref: Ref<TransformControl> | undefined) => {

    const transformControls = useTransformControls();

    if(transformControls){
       if('current' in transformControls){
           transformControls.current?.addEventListener('mouseup',() => {
               console.log('mouseup');
           })
       }
    }


    return (
        <TransformControls
            ref={transformControls}
            {...props}
        />

    );
});

export default EditTransformControls;