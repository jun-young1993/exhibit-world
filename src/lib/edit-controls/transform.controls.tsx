import {forwardRef, Ref, useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps, TransformControls as TransformControlsType} from "@react-three/drei/core/TransformControls";
import {getSingleMaterial} from "../../utills/mesh-info.utills";
import {Mesh, SpotLight} from "three";
import {useThree} from "@react-three/fiber";
import {TransformControl} from "../../types/transform";



const EditTransformControls = forwardRef((props: TransformControlsProps, ref: Ref<TransformControl> | undefined) => {

    const mesh= props.object as Mesh;
    const material = getSingleMaterial(mesh);




    return <>
        <TransformControls
            ref={ref}
            {...props}
        />
    </>;

})

export default EditTransformControls;