import {getSingleMaterial} from "../../utills/mesh-info.utills";
import {Mesh} from "three";
import {useMemo} from "react";
import {useControls} from "leva";

export default function MaterialControls({mesh}: {mesh: Mesh}){
    const name= 'material';

    let color: string = '#ffffff';
    let wireframe: boolean = false;

    const material = getSingleMaterial(mesh);
    if(material && 'color' in material){
        color = material.color as string;
    }
    if(material && 'wireframe' in material){
        wireframe = material.wireframe as boolean;
    }

    const options = useMemo(() => {
        return {
            wireframe: {
                value: wireframe,
                onChange: (v: boolean) => {
                    if(material && 'wireframe' in material){
                        material.wireframe = v;
                    }
                }
            },
            color: {
                value: color,
                onChange: (v: string) => {
                    if(material && 'color' in material){
                        material.color = v;
                    }
                }
            },
        }
    }, []);

    useControls(name,options);
    return <></>;
}