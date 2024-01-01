import MeshEntity from "./mesh.entity";
import {Object3DNode} from "@react-three/fiber";
import {Object3DEntity} from "./object3D.entity";
import {GithubStorageEntity} from "./github-storage.entity";



export interface GroupEntity extends Object3DEntity{
    id: string
    githubStorage: GithubStorageEntity
    mesh: MeshEntity[]
}