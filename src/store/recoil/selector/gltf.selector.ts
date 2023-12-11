import { selector } from "recoil";
import {GltfAtom} from "../atom/gltf.atom";

export const GltfSelector = selector({
    key: 'gltfSelector',
    get: ({get}) => {
        const gltf = get(GltfAtom);
        console.log(gltf);
    }
})