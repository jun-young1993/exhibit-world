import {Material, Mesh, MeshBasicMaterial} from "three";

export function getSingleMaterial(mesh: Mesh): Material | null
{
    if(Array.isArray(mesh.material)){
        if(mesh.material[0] instanceof Material){
            return mesh.material[0];
        }
    }else{
        if(mesh.material instanceof Material){
            return mesh.material;
        }
    }

    return null;
}