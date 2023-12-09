import {forwardRef, Ref, useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps, TransformControls as TransformControlsType} from "@react-three/drei/core/TransformControls";
import {getSingleMaterial} from "../../utills/mesh-info.utills";
import {Mesh, SpotLight} from "three";
import {useThree} from "@react-three/fiber";
import {TransformControl} from "../../types/transform";
import {useTransformControls} from "../../context/transform-controls.context";



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