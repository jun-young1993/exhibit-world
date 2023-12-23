import MeshEntity from "./mesh.entity";
import {Object3DNode} from "@react-three/fiber";
import {Object3DEntity} from "./object3D.entity";



export interface GroupEntity extends Object3DEntity{
    id: string
    mesh: MeshEntity[]
}