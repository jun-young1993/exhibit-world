import { atom } from "recoil";
import {GltfEntity} from "../../../clients/entities/gltf.entity";

export const GltfAtom = atom<GltfEntity[] | []>({
    key: 'gltfAtom',
    default: []
})