import create from "zustand";
import {Mesh} from "three";

export interface SelectedMeshInterface {
    selected: undefined | Mesh
    select: (mesh: undefined | Mesh) => void
}
const selectedMeshStore = create<SelectedMeshInterface>((set) => ({
    selected: undefined,
    select: (mesh: undefined | Mesh) => set({selected: mesh})
}))

export default selectedMeshStore;