import create from "zustand";
import {Mesh} from "three";

export interface MeshesStoreInterface {
    meshes: Map<string, Mesh>,
    set: (mesh: Mesh) => void
    merge: (meshes: Mesh[]) => void
}

const MeshesStore = create<MeshesStoreInterface>((set) => ({
    meshes: new Map<string, Mesh>(),
    set: (mesh: Mesh) => set((state) => ({
        meshes: state.meshes.set(mesh.uuid, mesh)
    })),
    merge: (meshes: Mesh[]) => set((state) => {
        meshes.forEach((mesh) => {
            state.meshes.set(mesh.uuid,mesh)
        })
        return {
            meshes: state.meshes
        }
    })
}))

export default MeshesStore;
