import MeshEntity, {MeshObjectProps} from "./mesh.entity";
import {Object3DNode} from "@react-three/fiber";

export interface GroupEntity extends MeshObjectProps{
    id: string
    mesh: MeshEntity[]
}