import {MeshesStoreInterface} from "./meshes.store";
import create from "zustand";
import {Mesh} from "three";

export interface GltfPreloadStoreInterface {
    meshes: Map<string, Mesh>,
    set: (mesh: Mesh) => void
}

const GltfPreloadStore = create<GltfPreloadStoreInterface>((set) => ({
    meshes: new Map<string, Mesh>(),
    set: (mesh: Mesh) => set((state) => ({
        meshes: state.meshes.set(mesh.uuid, mesh)
    })),
}))

export default GltfPreloadStore;