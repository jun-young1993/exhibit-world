import create from "zustand";
import {Mesh} from "three";
export interface SelectedMeshInterface {
    target: null | Mesh
    setTarget: (target: Mesh| null) => void
}
const selectedMeshStore = create<SelectedMeshInterface>((set) => ({
    target: null,
    setTarget: (target: Mesh | null) => set({target})
}))

export default selectedMeshStore;