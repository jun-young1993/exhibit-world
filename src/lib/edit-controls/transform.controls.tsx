import {useMemo, useRef} from "react";
import {TransformControls} from "@react-three/drei";
import {TransformControlsProps} from "@react-three/drei/core/TransformControls";
import {getSingleMaterial} from "../../utills/mesh-info.utills";
import {Mesh, SpotLight} from "three";
import {useThree} from "@react-three/fiber";


export default function EditTransformControls(props: TransformControlsProps)
{

    const mesh= props.object as Mesh;
    const material = getSingleMaterial(mesh);




    return <>
        <TransformControls
            {...props}
        />
    </>;

}