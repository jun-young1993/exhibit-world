import create from "zustand";
import ExhibitMeshEntity, {ExhibitMeshEntities} from "../clients/entities/exhibit-mesh.entity";

export interface MeshesStoreInterface {
    meshes: ExhibitMeshEntities,
    set: (mesh: ExhibitMeshEntity) => void
}

const MeshesStore = create<MeshesStoreInterface>((set) => ({
    meshes: [],
    set: (mesh: ExhibitMeshEntity) => set((state) => ({
        meshes: [...state.meshes, mesh]
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