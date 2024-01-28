import MeshEntity from "./mesh.entity";
import {Object3DNode} from "@react-three/fiber";
import {Object3DEntity} from "./object3D.entity";
import {GithubStorageContentEntity, GithubStorageEntity} from "./github-storage.entity";


export interface ExhibitEntity extends GithubStorageContentEntity{
    id: string,
    githubStorage: GithubStorageEntity,
    name?: string,
    createdAt: Date
}

