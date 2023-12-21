import {forwardRef, Ref, useEffect, useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {
    runTransformControls,
    useTransformControls
} from "../../context/transform-controls.context";
import {TransformControl} from "../../types/transform";



const EditTransformControls = forwardRef((props: TransformControlsProps, ref: Ref<TransformControl> | undefined) => {

    const transformControls = useTransformControls();

    const handleMouseUp = () => {
        console.log(props.object);
    }
    useEffect(() => {
        runTransformControls(
            transformControls,
            (transformControls) => {
                transformControls?.addEventListener('mouseUp',handleMouseUp);
            }
        )

        return () => {
            runTransformControls(
                transformControls,
                (transformControls) => {
                    transformControls?.removeEventListener('mouseUp',handleMouseUp);
                }
            )
        }
    },[transformControls])



    return (
        <TransformControls
            ref={transformControls}
            {...props}
        />

    );
});

export default EditTransformControls;