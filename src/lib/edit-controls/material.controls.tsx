// import {getSingleMaterial} from "../../utills/mesh-info.utills";
// import {Color, Mesh} from "three";
// import {useEffect, useMemo, useState} from "react";
// import {useControls} from "leva";
// import {EditControlsInterface} from "./edit.controls";
// import {rgbColor} from "../../types/color";
// export function MaterialControlsOptions(mesh: Mesh) {
//         let color:string =  '#ffffff';
//         let wireframe: boolean = false;
//
//         const material = getSingleMaterial(mesh);
//         if(material && 'color' in material){
//
//             const materialColor = material.color as Color;
//             color = `#${materialColor.getHexString()}`;
//
//         }
//         if(material && 'wireframe' in material){
//             wireframe = material.wireframe as boolean;
//         }
//
//         return {
//             wireframe: {
//                 value: wireframe,
//                 onChange: (v: boolean) => {
//                     if(material && 'wireframe' in material){
//                         material.wireframe = v;
//                     }
//                 }
//             },
//             color: {
//                 value: color,
//                 onChange: (colorHex: string) => {
//                     if (material && 'color' in material) {
//                         material.color = new Color(colorHex);
//                     }
//                 }
//             },
//         };
//
// }
// export default function MaterialControls({mesh}: EditControlsInterface){
//     const name= 'Material';
//
//     const [currentMesh, setCurrentMesh] = useState<Mesh>(mesh);
//     useEffect(() => {
//         setCurrentMesh(mesh);
//     },[])
//
//     const options = useMemo(() => MaterialControlsOptions(currentMesh), [currentMesh]);
//
//     useControls(options);
//
//     return null;
// }
import {EditControlsInterface} from "./edit.controls";
import {useState} from "react";
import {Mesh} from "three";

export default function MaterialControls( props: EditControlsInterface) {
    const [ mesh ] = useState<Mesh>(props.mesh)

    return <></>
}