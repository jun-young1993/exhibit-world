import create from "zustand";
import {ReactNode} from "react";

interface MeshesStoreInterface {
    meshes: ReactNode[] | [],
    setMesh: (mesh: ReactNode) => void
}

const MeshesStore = create<MeshesStoreInterface>((set) => ({
    meshes: [],
    setMesh: (mesh: ReactNode) => set((state) => ({
        meshes: [...state.meshes, mesh]
    }))
}))
export default MeshesStore;