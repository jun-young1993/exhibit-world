import create from "zustand";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
import {Mesh} from "three";



export interface MeshesStoreInterface {
    meshes: Map<string, Mesh>,
    set: (mesh: Mesh) => void
}

const MeshesStore = create<MeshesStoreInterface>((set) => ({
    meshes: new Map<string, Mesh>(),
    set: (mesh: Mesh) => set((state) => ({
        meshes: state.meshes.set(mesh.uuid, mesh)
    }))
}))
export default MeshesStore;
//
// import create from "zustand";
// import {ReactNode} from "react";
// import ExhibitMeshEntity, {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";
//
// export interface MeshesStoreInterface {
//     meshes: ExhibitMeshEntities,
//     set: (mesh: ExhibitMeshEntity | ExhibitMeshEntities) => void
// }
//
// const MeshesStore = create<MeshesStoreInterface>((set) => ({
//     meshes: [],
//     set: (mesh: ExhibitMeshEntity | ExhibitMeshEntities) => set((state) => ({
//         meshes: (Array.isArray(mesh) ? [...[],...state.meshes, ...mesh] : [...state.meshes, mesh])
//     })),
// }))
// export default MeshesStore;